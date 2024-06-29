import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { MoreThan, Repository, UpdateResult } from 'typeorm';
import { CoachSummaryDto } from '../coaches/dtos/coach-summary.dto';
import { UserKeys } from '../../entity/user-keys.entity';
import { CoachesService } from '../coaches/coach.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserKeys)
    private readonly keysRepository: Repository<UserKeys>,

    private readonly coachesService: CoachesService,
  ) {}

  async findOneByEmail(
    email: string,
    throwException: boolean = true,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user && throwException) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUsername(
    username: string,
    throwException: boolean = true,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user && throwException) throw new NotFoundException('User not found');
    return user;
  }

  async findOneById(
    id: number,
    throwException: boolean = true,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user && throwException) throw new NotFoundException('User not found');
    return user;
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, userInfo: Partial<User>): Promise<UpdateResult> {
    await this.findOneById(id);

    return await this.usersRepository.update(id, userInfo);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected == 0) throw new NotFoundException('User not found');
  }

  async getKeys(id: number): Promise<UserKeys> {
    return await this.keysRepository.findOne({ where: { userId: id } });
  }

  async setotp(otp, otpExpire, email) {
    try {
      const userRepository = this.usersRepository;
      const updateFields: { resetPasswordToken: any; otpExpiration?: any } = {
        resetPasswordToken: otp,
      };

      // Include otpExpiration only if it's provided
      if (otpExpire) {
        updateFields.otpExpiration = otpExpire;
      }
      await userRepository
        .createQueryBuilder()
        .update(User)
        .set(updateFields)
        .where('email = :email', { email })
        .execute();
      return 'Success';
    } catch (error) {
      console.error('Error updating OTP:', error.message); // Log the actual error message
      return 'Failed to update OTP'; // Return a generic error message
    }
  }

  async checkotp(email): Promise<User> {
    try {
      const userRepository = this.usersRepository;
      // Check if there's a user with the given OTP and if the OTP hasn't expired
      const user = await userRepository.findOne({
        where: {
          email: email,
          resetPasswordTokenSentAt: MoreThan(new Date()),
        },
      });
      return user;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException('User not exists or otp invalid');
    }
  }

  async getMyCoaches(userId: number): Promise<CoachSummaryDto[]> {
    const now = new Date();
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: [
        'subscriptions',
        'subscriptions.package',
        'subscriptions.package.coach',
        'subscriptions.package.coach.user',
        'subscriptions.reviews',
      ],
    });

    if (!user) throw new NotFoundException(`User not found`);

    const subscribedCoaches = user.subscriptions
      .filter((subscription) => subscription.endDate > now)
      .map((subscription) => subscription.package.coach);

    const uniqueCoaches = Array.from(
      new Set(subscribedCoaches.map((coach) => coach.id)),
    ).map((id) => subscribedCoaches.find((coach) => coach.id === id));

    const coachSummaryDtos: CoachSummaryDto[] = await Promise.all(
      uniqueCoaches.map(async (coach) => {
        const reviewsCount = await this.coachesService.getReviewsCount(
          coach.id,
        );

        return {
          id: (await coach.user).id,
          coachId: coach.id,
          name: `${(await coach.user).firstName} ${(await coach.user).lastName}`,
          profilePictureUrl: (await coach.user).profilePictureUrl,
          rating: coach.rating,
          reviewsNo: reviewsCount,
        };
      }),
    );

    return coachSummaryDtos;
  }
}

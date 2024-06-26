import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { MoreThan, Repository, UpdateResult } from 'typeorm';
import { UserKeys } from 'src/entity/user-keys.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserKeys)
    private keysRepository: Repository<UserKeys>,
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
}

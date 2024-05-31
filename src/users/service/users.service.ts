import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MoreThan, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  update(userId: number, userInformation: Partial<User>): Promise<UpdateResult> {
    return this.usersRepository.update(userId, userInformation);
  }

  delete(userId: UUID): Promise<DeleteResult> {
    return this.usersRepository.delete(userId);
  }
  
  async setotp(otp, otpExpire, email) {
    try {
        const userRepository = this.usersRepository;
        const updateFields: { resetPasswordToken: any; otpExpiration?: any } = { resetPasswordToken: otp };

        // Include otpExpiration only if it's provided
        if (otpExpire) {
            updateFields.otpExpiration = otpExpire;
        }
        await userRepository
        .createQueryBuilder()
        .update(User)
        .set(updateFields)
        .where("email = :email", { email })
        .execute();
        return "Success";
    } catch (error) {
        console.error("Error updating OTP:", error.message); // Log the actual error message
        return "Failed to update OTP"; // Return a generic error message
    }
}

async checkotp(email): Promise<User>{
    try {
        const userRepository = this.usersRepository;
        // Check if there's a user with the given OTP and if the OTP hasn't expired
        const user = await userRepository.findOne({
            where: {
                email:email,
                resetPasswordTokenSentAt: MoreThan(new Date()) 
            }
        });
        return user;
    } catch (err) {
        console.error(err);
        throw new UnauthorizedException('User not exists or otp invalid');
    }
}
}

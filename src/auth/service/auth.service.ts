import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { DevicesService } from 'src/users/service/devices.service';
import { DeviceDto } from 'src/users/dtos/device.dto';
import { Coach } from 'src/users/coaches/coach.entity';
import { CoachesService } from 'src/users/coaches/coach.service';
import { Hash } from 'src/shared/utils/Hash';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coachesService: CoachesService,
    private readonly jwtService: JwtService,
    private readonly deviceService: DevicesService,
  ) {}

  async authenticateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch: boolean = await Hash.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(
    user: UserLoginRequestDto,
    device: DeviceDto,
  ): Promise<UserAuthResponseDto> {
    const validatedUser = await this.authenticateUser(
      user.email,
      user.password,
    );
    await this.deviceService.saveUserDevice(validatedUser.id, device.fcmToken);
    return this.getToken(validatedUser);
  }

  async getToken(user: User): Promise<UserAuthResponseDto> {
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    const userDto: UserDto = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
    return new UserAuthResponseDto(token, userDto);
  }

  async register(
    user: UserRegisterRequestDto,
    device: DeviceDto,
  ): Promise<UserAuthResponseDto> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await Hash.make(user.password);
    const newUser: User = {
      ...user,
      password: hashedPassword,
      gender: '',
      profilePictureUrl: '',
      countryCode: '',
      phoneNumber: '',
      dateOfBirth: null,
      verificationToken: '',
      verificationTokenSentAt: null,
      resetPasswordToken: '',
      resetPasswordTokenSentAt: null,
      isEmailVerified: false,
      isSocialAccount: false,
      enableNotifications: true,
      defaultLocale: 'en',
      createdAt: new Date(),
      updatedAt: new Date(),
      devices: [],
      coach: new Coach(),
    };

    if (user.isCoach) {
      const newCoach = new Coach();
      newUser.coach = newCoach;
      await this.usersService.create(newUser); // Save user first
      newCoach.user = newUser;
      await this.coachesService.create(newCoach); // Save coach separately
    } else {
      await this.usersService.create(newUser);
    }
    await this.deviceService.saveUserDevice(newUser.id, device.fcmToken);
    return this.getToken(newUser);
  }
}

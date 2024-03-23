import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: UserLoginRequestDto): Promise<UserAuthResponseDto> {
    const validatedUser = await this.authenticateUser(
      user.email,
      user.password,
    );
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

  async register(user: UserRegisterRequestDto): Promise<UserAuthResponseDto> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUser: User = {
      ...user,
      password: hashedPassword,
      gender: '',
      profilePictureUrl: '',
      countryCode: '',
      phoneNumber: '',
      dateOfBirth: new Date(),
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
    };
    await this.usersService.create(newUser);
    return this.getToken(newUser);
  }
}

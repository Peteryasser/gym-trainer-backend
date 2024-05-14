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
import { UserType } from 'src/users/user-type.enum';
import { TokenPayload } from '../types/token.payload';

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
    deviceDTO: DeviceDto,
  ): Promise<UserAuthResponseDto> {
    const validatedUser = await this.authenticateUser(
      user.email,
      user.password,
    );
    const device = await this.deviceService.saveUserDevice(
      validatedUser.id,
      deviceDTO.fcmToken,
    );

    return this.createUserAuthResponse(validatedUser, device.id);
  }

  async register(
    user: UserRegisterRequestDto,
    deviceDTO: DeviceDto,
  ): Promise<UserAuthResponseDto> {
    const existingUser = await this.usersService.findOneByEmail(
      user.email,
      false,
    );

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await Hash.make(user.password);
    const partialNewUser: Partial<User> = {
      ...user,
      password: hashedPassword,
    };

    const newUser: User = partialNewUser as User;

    if (user.isCoach) {
      const newCoach = new Coach();
      newUser.coach = newCoach;
      await this.usersService.create(newUser); // Save user first
      newCoach.user = newUser;
      await this.coachesService.create(newCoach); // Save coach separately
    } else {
      await this.usersService.create(newUser);
    }

    const device = await this.deviceService.saveUserDevice(
      newUser.id,
      deviceDTO.fcmToken,
    );
    return await this.createUserAuthResponse(newUser, device.id);
  }

  private async getToken(
    user: User | Coach,
    deviceID: number,
  ): Promise<string> {
    const userType: UserType =
      user instanceof Coach ? UserType.COACH : UserType.USER;

    const payload: TokenPayload = {
      userID: user.id,
      userType: userType,
      deviceID: deviceID,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  private createUserDTO(user: User | Coach): UserDto {
    if (user instanceof Coach) {
      user = user.user;
    }

    const userDto: UserDto = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    return userDto;
  }

  private async createUserAuthResponse(
    user: User | Coach,
    deviceID: number,
  ): Promise<UserAuthResponseDto> {
    const token = await this.getToken(user, deviceID);
    const userDto = this.createUserDTO(user);

    return new UserAuthResponseDto(token, userDto);
  }
}

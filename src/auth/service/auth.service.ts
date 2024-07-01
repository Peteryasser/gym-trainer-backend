import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserForgetPasswordRequestDto } from '../dtos/user.forgetpassword.request.dto';
import { UserChangePasswordRequestDto } from '../dtos/user.changepassword.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import nodemailer = require('nodemailer');
import { config as dotenvConfig } from 'dotenv';
import * as bcrypt from 'bcrypt';
import { UserResetPasswordRequestDto } from '../dtos/user.resetpassword.request.dto';

dotenvConfig({ path: '.env' });
import { UserDto } from '../../users/dtos/user.dto';
import { DevicesService } from '../../users/service/devices.service';
import { CoachesService } from '../../users/coaches/coach.service';
import { Hash } from '../../shared/utils/Hash';
import { UserType } from '../../users/user-type.enum';
import { TokenPayload } from '../types/token.payload';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { CryptoService } from '../../crypto/service/crypto.service';
import { UserKeysDto } from '../dtos/user-keys.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from '../../entity/device.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly coachesService: CoachesService,
    private readonly jwtService: JwtService,
    private readonly deviceService: DevicesService,
    private readonly cryptoService: CryptoService,
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
  ) {}

  private async authenticateUser(
    userType: UserType,
    userDto: UserLoginRequestDto,
  ): Promise<User> {
    let user: User = null;
    if (userDto.email) {
      user = await this.usersService.findOneByEmail(userDto.email);
    } else {
      user = await this.usersService.findOneByUsername(userDto.username);
    }
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (userType == UserType.coach && !user.coach)
      throw new BadRequestException();

    const isMatch: boolean = await Hash.compare(
      userDto.password,
      user.password,
    );
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(
    userType: UserType,
    user: UserLoginRequestDto,
    retrieveKeys: boolean = false,
  ): Promise<UserAuthResponseDto> {
    let validatedUser: User | Coach = await this.authenticateUser(
      userType,
      user,
    );
    const device = await this.deviceService.saveUserDevice(
      validatedUser.id,
      user.fcmToken,
    );

    let keys = null;
    if (retrieveKeys === true)
      keys = await this.buildKeyPairDto(validatedUser.id, user.password);

    if (userType == UserType.coach) validatedUser = validatedUser.coach;

    return this.createUserAuthResponse(validatedUser, device.id, keys);
  }

  async register(user: UserRegisterRequestDto): Promise<UserAuthResponseDto> {
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
      newCoach.user = Promise.resolve(newUser);

      newUser.coach = newCoach;

      await this.usersService.create(newUser);
    } else {
      await this.usersService.create(newUser);
    }

    const device = await this.deviceService.saveUserDevice(
      newUser.id,
      user.fcmToken,
    );

    await this.cryptoService.saveKeyPair(newUser.id, user.password);
    const keys = await this.buildKeyPairDto(newUser.id, user.password);

    if (user.isCoach)
      return await this.createUserAuthResponse(newUser.coach, device.id, keys);

    return await this.createUserAuthResponse(newUser, device.id, keys);
  }

  async logout(deviceID: number): Promise<void> {
    await this.deviceService.delete(deviceID);
  }

  private async getToken(
    user: User | Coach,
    deviceID: number,
  ): Promise<string> {
    const userType: UserType =
      user instanceof Coach ? UserType.coach : UserType.user;

    const payload: TokenPayload = {
      userID: user.id,
      userType: userType,
      deviceID: deviceID,
    };
    const token = this.jwtService.sign(payload);

    return token;
  }

  private async createUserDTO(user: User | Coach): Promise<UserDto> {
    if (user instanceof Coach) {
      user = await user.user;
    }
    const userDto: UserDto = {
      id: user.id,
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
    keys?: UserKeysDto | null,
  ): Promise<UserAuthResponseDto> {
    const token = await this.getToken(user, deviceID);
    const userDto = await this.createUserDTO(user);

    return new UserAuthResponseDto(token, userDto, keys);
  }

  private async buildKeyPairDto(
    userId: number,
    password: string,
  ): Promise<UserKeysDto> {
    let keys = null;

    keys = await this.usersService.getKeys(userId);
    const publicKey = keys.publicKey;
    const privateKey = this.cryptoService.decryptPrivKey(
      keys.encryptedPrivateKey,
      password,
      keys.salt,
    );
    keys = { publicKey, privateKey };
    return keys;
  }

  async forgetPassword(user: UserForgetPasswordRequestDto): Promise<String> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (!existingUser) {
      throw new UnauthorizedException('User not exists');
    }
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      const otpExpire = new Date();

      otpExpire.setMinutes(otpExpire.getMinutes() + 5);
      const salt = await bcrypt.genSalt();
      const hashedotp = await bcrypt.hash(otp, salt);
      const email = existingUser.email;
      await this.usersService.setotp(hashedotp, otpExpire, email);

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_KEY}`,
        },
      });

      const mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: 'Password reset OTP',
        text: `Your OTP (It is expired after 5 min) : ${otp}`,
      };

      // Await sendMail operation to ensure proper execution and error handling
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);

      return 'Your OTP has been sent to your email.';
    } catch (error) {
      console.error('Error sending email:', error.message);
      return 'Error sending OTP'; // Return an error message
    }
  }
  async resetPassword(user: UserResetPasswordRequestDto): Promise<String> {
    if (user.password.localeCompare(user.confirmPassword) != 0)
      throw new BadRequestException('Passwords do not match');
    const existingUser = await this.usersService.checkotp(user.email);
    try {
      const checkOtpMatched: boolean = await bcrypt.compare(
        user.otp,
        existingUser.resetPasswordToken,
      );
      if (!checkOtpMatched) return 'OTP is invalid';
      const changePassworddto = new UserChangePasswordRequestDto(
        user.password,
        user.confirmPassword,
      );
      return await this.changePassword(changePassworddto, existingUser);
    } catch (err) {
      return 'Error';
    }
  }
  async changePassword(
    user: UserChangePasswordRequestDto,
    userLoged: User,
  ): Promise<String> {
    if (user.password.localeCompare(user.confirmPassword) != 0)
      throw new BadRequestException('Passwords do not match');
    const existingUser = await this.usersService.findOneById(userLoged.id);
    if (!existingUser) {
      throw new NotFoundException('User not exists');
    }
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      existingUser.password = hashedPassword;
      await this.usersService.update(userLoged.id, {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenSentAt: null,
      });
      await this.deviceRepository.delete({ userId: userLoged.id });
    } catch (err) {
      return 'Error';
    }
  }
}

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserForgetPasswordRequestDto } from '../dtos/user.forgetpassword.request.dto';
import { UserChangePasswordRequestDto } from '../dtos/user.changepassword.request.dto' 
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserDto } from 'src/users/dtos/user.dto';
import { DevicesService } from 'src/users/service/devices.service';
import { DeviceDto } from 'src/users/dtos/device.dto';
import { Coach } from 'src/users/coaches/coach.entity';
import { CoachesService } from 'src/users/coaches/coach.service';
import nodemailer = require('nodemailer');
import { config as dotenvConfig } from 'dotenv';
import { UserResetPasswordRequestDto } from '../dtos/user.resetpassword.request.dto';
import { UUID } from 'crypto';

dotenvConfig({ path: '.env' });

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
    const isMatch: boolean = await bcrypt.compare(password, user.password);
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
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
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

  async forgetPassword(
    user: UserForgetPasswordRequestDto
  ): Promise<String> {
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
      console.log("Email sent:", info.response);

      return "Your OTP has been sent to your email.";
  } catch (error) {
      console.error("Error sending email:", error.message);
      return "Error sending OTP"; // Return an error message
  }
  }
  async resetPassword(
    user: UserResetPasswordRequestDto
  ): Promise<String> {
      if (user.password.localeCompare(user.confirmPassword) != 0) throw new BadRequestException('Passwords do not match');
      const existingUser = await this.usersService.checkotp(user.email);
      try {      
        const checkOtpMatched: boolean = await bcrypt.compare(user.otp, existingUser.resetPasswordToken);
        if (!checkOtpMatched) return "OTP is invalid";
        const changePassworddto = new UserChangePasswordRequestDto(
          existingUser.id,
          user.password,
          user.confirmPassword
        )
        return await this.changePassword(changePassworddto);
        
    }
    catch (err) {
        return "Error";
    }
  }
  async changePassword( //use jwt and remove devises
    user: UserChangePasswordRequestDto
  ): Promise<String> {
    if (user.password.localeCompare(user.confirmPassword) != 0) throw new BadRequestException('Passwords do not match');
    const existingUser = await this.usersService.findOneById(user.id);
    if (!existingUser) {
      throw new UnauthorizedException('User not exists');
    }
    try {      
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      existingUser.password= hashedPassword;
      await this.usersService.update(user.id, {password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenSentAt: null
      })
    }
    catch (err) {
        return "Error";
    }

  }
}


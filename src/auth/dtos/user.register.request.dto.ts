import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { PASSWORD_REGEX } from '../constants';

export class UserRegisterRequestDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(PASSWORD_REGEX, { message: 'password is too weak' })
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  isCoach: boolean;

  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;

  @IsOptional()
  countryCode: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  profilePictureUrl: string;

  @IsString()
  @MinLength(6)
  fcmToken: string;
}

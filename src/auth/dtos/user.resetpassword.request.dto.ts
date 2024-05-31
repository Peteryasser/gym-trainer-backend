import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UserResetPasswordRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  confirmPassword: string;

  @IsNumber()
  @Length(6)
  otp: string;
}

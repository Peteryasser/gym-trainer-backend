import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

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
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

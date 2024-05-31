import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserForgetPasswordRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

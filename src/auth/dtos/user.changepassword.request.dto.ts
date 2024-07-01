import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    MinLength,
  } from 'class-validator';
  
  export class UserChangePasswordRequestDto {

    @IsString()
    @MinLength(6)
    password: string;
  
    @IsString()
    @MinLength(6)
    confirmPassword: string;

    constructor(password: string, confirmPassword: string){
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

  }
  
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    MinLength,
  } from 'class-validator';
  
  export class UserChangePasswordRequestDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
  
    @IsString()
    @MinLength(6)
    password: string;
  
    @IsString()
    @MinLength(6)
    confirmPassword: string;

    constructor(id: number, password: string, confirmPassword: string){
        this.id = id,
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

  }
  
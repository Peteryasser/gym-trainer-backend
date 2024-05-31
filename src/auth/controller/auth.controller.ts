import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from '../decorators/public.decorator';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserForgetPasswordRequestDto } from '../dtos/user.forgetpassword.request.dto';
import { UserResetPasswordRequestDto } from '../dtos/user.resetpassword.request.dto';
import { UserChangePasswordRequestDto } from '../dtos/user.changepassword.request.dto';
import { DeviceDto } from 'src/users/dtos/device.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() payload: { user: UserLoginRequestDto, device: DeviceDto },
  ): Promise<UserAuthResponseDto | BadRequestException> {
    return this.authService.login(payload.user, payload.device);
  }

  @Post('register')
  async register(
    @Body() payload: { user: UserRegisterRequestDto, device: DeviceDto },
  ): Promise<UserAuthResponseDto | BadRequestException> {
    return await this.authService.register(payload.user, payload.device);
  }

  @Post('forgetPassword')
  async forgetPassword(
    @Body() payload: { user: UserForgetPasswordRequestDto },
  ): Promise<String | BadRequestException> {
    return await this.authService.forgetPassword(payload.user);
  }
  @Post('resetPassword')
  async resetPassword(
    @Body() payload: { user: UserResetPasswordRequestDto },
  ): Promise<String | BadRequestException> {
    return await this.authService.resetPassword(payload.user);
  }
  @Post('changePassword')
  async changePassword(
    @Body() payload: { user: UserChangePasswordRequestDto },
  ): Promise<String | BadRequestException> {
    return await this.authService.changePassword(payload.user);
  }

}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Public } from '../decorators/public.decorator';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';
import { UserForgetPasswordRequestDto } from '../dtos/user.forgetpassword.request.dto';
import { UserResetPasswordRequestDto } from '../dtos/user.resetpassword.request.dto';
import { UserChangePasswordRequestDto } from '../dtos/user.changepassword.request.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { AuthService } from '../service/auth.service';
import { UserType } from '../../users/user-type.enum';
import { UserTypeValidationPipe } from '../../pipe';
import { RequestHeaders } from 'src/utils/headers/request-header.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':userType/login')
  async login(
    @Param('userType', new UserTypeValidationPipe()) userType: UserType,
    @Body() payload: UserLoginRequestDto,
    @RequestHeaders() headers,
  ): Promise<UserAuthResponseDto> {

    console.log("got login request: ", payload);
    return this.authService.login(
      userType,
      payload,
      headers['x-retrieve-keys'] === 'true',
    );
  }

  @Post('register')
  async register(
    @Body() payload: UserRegisterRequestDto,
  ): Promise<UserAuthResponseDto> {
    console.log("got register request: ", payload);
    return await this.authService.register(payload);
  }

  @Public(false)
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Req() req): Promise<void> {
    const deviceID = req.user.device.id;
    console.log("got logout request: ", deviceID);

    await this.authService.logout(deviceID);
  }

  @Post('forgetPassword')
  async forgetPassword(
    @Body() payload: { user: UserForgetPasswordRequestDto },
  ): Promise<String | BadRequestException> {
    console.log("got forgetPassword request: ", payload);
    return await this.authService.forgetPassword(payload.user);
  }
  @Post('resetPassword')
  async resetPassword(
    @Body() payload: { user: UserResetPasswordRequestDto },
  ): Promise<String | BadRequestException> {
    console.log("got resetPassword request: ", payload);
    return await this.authService.resetPassword(payload.user);
  }
  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(
    @Body() payload: { user: UserChangePasswordRequestDto }, @GetUser() user: User
  ): Promise<String | BadRequestException> {
    return await this.authService.changePassword(payload.user,user);
  }
}

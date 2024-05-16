import {
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
import { DeviceDto } from 'src/users/dtos/device.dto';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { AuthService } from '../service/auth.service';
import { UserType } from 'src/users/user-type.enum';
import { UserTypeValidationPipe } from 'src/pipe';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':userType/login')
  async login(
    @Param('userType', new UserTypeValidationPipe()) userType: UserType,
    @Body() payload: { user: UserLoginRequestDto; device: DeviceDto },
  ): Promise<UserAuthResponseDto> {
    return this.authService.login(userType, payload.user, payload.device);
  }

  @Post('register')
  async register(
    @Body() payload: { user: UserRegisterRequestDto; device: DeviceDto },
  ): Promise<UserAuthResponseDto> {
    return await this.authService.register(payload.user, payload.device);
  }

  @Public(false)
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Req() req): Promise<void> {
    const deviceID = req.user.device.id;

    await this.authService.logout(deviceID);
  }
}

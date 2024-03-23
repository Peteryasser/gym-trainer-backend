import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { Public } from '../decorators/public.decorator';
import { UserRegisterRequestDto } from '../dtos/user.register.request.dto';
import { UserAuthResponseDto } from '../dtos/user.auth.response.dto';
import { UserLoginRequestDto } from '../dtos/user.login.request.dto';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginBody: UserLoginRequestDto,
  ): Promise<UserAuthResponseDto | BadRequestException> {
    return this.authService.login(loginBody);
  }

  @Post('register')
  async register(
    @Body() registerBody: UserRegisterRequestDto,
  ): Promise<UserAuthResponseDto | BadRequestException> {
    return await this.authService.register(registerBody);
  }
}

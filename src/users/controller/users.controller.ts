import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UsersService } from '../service/users.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { CoachSummaryDto } from '../coaches/dtos/coach-summary.dto';
import { User } from '../../entity/user.entity';
import { UserProfileDto } from '../dtos/user-profile,dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('my_coaches')
  getMyCoaches(@GetUser() user: User): Promise<CoachSummaryDto[]> {
    return this.usersService.getMyCoaches(user.id);
  }

  @Get('my_profile')
  getMyProfile(@GetUser() user: User): UserProfileDto {
    return new UserProfileDto(user);
  }

  @Get('profile/:id')
  getProfile(@Param('id', ParseIntPipe) id: number): Promise<UserProfileDto> {
    return this.usersService.getProfile(id);
  }
}

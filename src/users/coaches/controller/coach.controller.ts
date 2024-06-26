import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CoachesService } from '../coach.service';
import { CoachProfileDto } from '../dtos/coach-profile.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Coach } from 'src/entity/coach.entity';

@UseGuards(JwtAuthGuard)
@Controller('coach_profile')
export class CoachController {
  constructor(private readonly coachesService: CoachesService) {}

  @Get('my_profile')
  async myProfile(@GetUser() user: Coach): Promise<CoachProfileDto> {
    return await this.coachesService.getProfile(user.id);
  }

  @Get(':id')
  async coachProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoachProfileDto> {
    return await this.coachesService.getProfile(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';
import { CoachesService } from '../coach.service';
import { CoachProfileDto } from '../dtos/coach-profile.dto';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { Coach } from '../../../entity/coach.entity';
import { CoachFilterDto } from '../dtos/coach-filter.dto';
import { CoachSummaryDto } from '../dtos/coach-summary.dto';
import { PaginatedResultDto } from '../../../dtos/paginatied-result.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class CoachController {
  constructor(private readonly coachesService: CoachesService) {}

  @Get('coach')
  async getAll(
    @Body() filterDto: CoachFilterDto,
  ): Promise<PaginatedResultDto<CoachSummaryDto>> {
    return await this.coachesService.getAll(filterDto);
  }

  @Get('coach_profile/my_profile')
  async myProfile(@GetUser() user: Coach): Promise<CoachProfileDto> {
    return await this.coachesService.getProfile(user.id);
  }

  @Get('coach_profile/:id')
  async coachProfile(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoachProfileDto> {
    return await this.coachesService.getProfile(id);
  }
}

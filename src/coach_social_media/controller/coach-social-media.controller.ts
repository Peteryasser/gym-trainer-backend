import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CoachSocialMediaService } from '../service/coach-social-media.service';
import { CoachSocialMedia } from 'src/entity/coach-social-media.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Coach } from 'src/entity/coach.entity';
import { CreateSocialMediaDto } from '../dtos/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dtos/update-social-media.dto';

@UseGuards(JwtAuthGuard)
@Controller('social_media')
export class CoachSocialMediaController {
  constructor(private readonly socialMediaService: CoachSocialMediaService) {}

  @Post()
  async create(
    @Body() createSocialMediaDto: CreateSocialMediaDto,
    @GetUser() user: Coach,
  ): Promise<CoachSocialMedia> {
    return this.socialMediaService.create(createSocialMediaDto, user);
  }

  @Get('my_accounts')
  async getAll(@GetUser() user: Coach): Promise<CoachSocialMedia[]> {
    return this.socialMediaService.getAll(user);
  }

  @Get()
  async getCoachAll(
    @Query('coachId', ParseIntPipe) coachId: number,
  ): Promise<CoachSocialMedia[]> {
    return this.socialMediaService.getCoachAll(coachId);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoachSocialMedia> {
    return this.socialMediaService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Coach,
    @Body() accountDto: UpdateSocialMediaDto,
  ): Promise<CoachSocialMedia> {
    return this.socialMediaService.update(id, user, accountDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Coach,
  ): Promise<any> {
    await this.socialMediaService.delete(id, user);

    return { success: true, message: 'Account deleted successfully' };
  }
}

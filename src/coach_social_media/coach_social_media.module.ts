import { Module } from '@nestjs/common';
import { CoachSocialMediaController } from './controller/coach-social-media.controller';
import { CoachSocialMediaService } from './service/coach-social-media.service';
import { CoachSocialMedia } from '../entity/coach-social-media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CoachSocialMedia])],
  controllers: [CoachSocialMediaController],
  providers: [CoachSocialMediaService],
})
export class CoachSocialMediaModule {}

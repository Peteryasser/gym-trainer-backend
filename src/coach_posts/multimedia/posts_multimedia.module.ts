import { Module } from '@nestjs/common';
import { MultimediaService } from './service/multimedia.service';
import { MultimediaController } from './controller/multimedia.controller';

@Module({
  providers: [MultimediaService],
  controllers: [MultimediaController],
})
export class PostMultimediaModule {}

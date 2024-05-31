import { Module } from '@nestjs/common';
import { Coach } from '../../entity/coach.entity';
import { CoachesService } from './coach.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}

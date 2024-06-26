import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from '../../entity/coach.entity';
import { Package } from '../../entity/coach-package.entity';
import { CoachesService } from './coach.service';
import { CoachController } from './controller/coach.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coach, Package])],
  controllers: [CoachController],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}

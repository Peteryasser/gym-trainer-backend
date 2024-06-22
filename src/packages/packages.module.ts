import { Module } from '@nestjs/common';
import { PackagesController } from './controller/packages.controller';
import { PackagesService } from './services/packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from '../entity/coach-package.entity';
import { Coach } from '../entity/coach.entity';
import { CoachesService } from '../users/coaches/coach.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Coach])],
  controllers: [PackagesController],
  providers: [PackagesService, CoachesService],
})
export class PackagesModule {}

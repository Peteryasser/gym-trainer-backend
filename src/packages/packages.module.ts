import { Module } from '@nestjs/common';
import { PackagesController } from './controller/packages.controller';
import { PackagesService } from './services/packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/entity/coach-package.entity';
import { Coach } from 'src/entity/coach.entity';
import { CoachesService } from 'src/users/coaches/coach.service';

@Module({
  imports: [TypeOrmModule.forFeature([Package, Coach])],
  controllers: [PackagesController],
  providers: [PackagesService, CoachesService],
})
export class PackagesModule {}

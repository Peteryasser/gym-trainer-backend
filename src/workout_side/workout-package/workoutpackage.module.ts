import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPackageWorkoutPlan } from '../../entity/user-package-workoutPlan.entity';
import { WorkoutPlanPackageController } from './workoutpackage.controller';
import { WorkoutPlanPackageService } from './workoutpackage.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPackageWorkoutPlan])],
  providers: [WorkoutPlanPackageService],
  controllers: [WorkoutPlanPackageController],
})
export class WorkoutPlanPackegeModule {}

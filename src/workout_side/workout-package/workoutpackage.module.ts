import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPackageWorkoutPlan } from 'src/entity/user-package-workoutPlan';
import { WorkoutPlanPackageController } from './workoutpackage.controller';
import { WorkoutPlanPackageService } from './workoutpackage.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserPackageWorkoutPlan])],
  providers: [WorkoutPlanPackageService],
  controllers: [WorkoutPlanPackageController],
})
export class WorkoutPlanPackegeModule {}

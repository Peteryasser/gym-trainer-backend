import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from '../../entity/workout-plan';
import { WorkoutPlanDetails } from '../../entity/workout-plan-details';
import { WorkoutPlanService } from './workoutplan.service';
import { WorkoutPlanController } from './workoutplan.controller';
import { User } from '../../entity/user.entity';
import { WorkoutCollection } from '../../entity/workout-collection';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutPlan,
      WorkoutPlanDetails,
      User,
      WorkoutCollection,
    ]),
  ],
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService],
  exports: [WorkoutPlanService],
})
export class WorkoutPlanModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutPlan } from 'src/entity/workout-plan';
import { WorkoutPlanDetails } from 'src/entity/workout-plan-details';
import { WorkoutPlanService } from './workoutplan.service';
import { WorkoutPlanController } from './workoutplan.controller';
import { User } from 'src/entity/user.entity';
import { WorkoutCollection } from 'src/entity/workout-collection';

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

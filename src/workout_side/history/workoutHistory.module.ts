import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutHistory } from '../../entity/user-workout-history'; // Ensure to import WorkoutHistory entity
import { WorkoutHistoryService } from './workoutHistory.service';
import { WorkoutHistoryController } from './workoutHistory.controller';
import { User } from '../../entity/user.entity'; // Ensure to import User entity
import { Workout } from '../../entity/workout.entity'; // Ensure to import Workout entity

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutHistory, User, Workout])],
  providers: [WorkoutHistoryService],
  controllers: [WorkoutHistoryController],
  exports: [WorkoutHistoryService],
})
export class WorkoutHistoryModule {}

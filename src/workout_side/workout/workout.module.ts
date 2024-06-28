import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout } from '../../entity/workout.entity';
import { WorkoutExercise } from '../../entity/workout-exercise';
import { WorkoutExerciseDetails } from '../../entity/workout-exercise-details';
import { Exercise } from '../../entity/exercise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workout,
      WorkoutExercise,
      WorkoutExerciseDetails,
      Exercise,
    ]),
  ],
  providers: [WorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}

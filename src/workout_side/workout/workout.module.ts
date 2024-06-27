import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutExercise } from 'src/entity/workout-exercise';
import { WorkoutExerciseDetails } from 'src/entity/workout-exercise-details';
import { Exercise } from 'src/entity/exercise.entity';

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

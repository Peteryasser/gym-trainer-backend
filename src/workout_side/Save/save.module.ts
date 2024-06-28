import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../../entity/exercise.entity';
import { SavedExercise } from '../../entity/saved-exercises';
import { SavedWorkout } from '../../entity/saved-workouts';
import { WorkoutCollection } from '../../entity/workout-collection';
import { Workout } from '../../entity/workout.entity';
import { SavedWorkoutCollection } from '../../entity/saved-workout-collection';
import { SaveController } from './save.controller';
import { SaveService } from './save.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Workout,
      WorkoutCollection,
      Exercise,
      SavedExercise,
      SavedWorkout,
      SavedWorkoutCollection,
    ]),
  ],
  controllers: [SaveController],
  providers: [SaveService],
})
export class SaveModule {}

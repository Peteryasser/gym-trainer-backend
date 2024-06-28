import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../../entity/exercise.entity';
import { SavedExercise } from '../../entity/saved-exercises.entity';
import { SavedWorkout } from '../../entity/saved-workouts.entity';
import { WorkoutCollection } from '../../entity/workout-collection.entity';
import { Workout } from '../../entity/workout.entity';
import { SavedWorkoutCollection } from '../../entity/saved-workout-collection.entity';
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

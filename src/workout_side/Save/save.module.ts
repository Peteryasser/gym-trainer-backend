import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entity/exercise.entity';
import { SavedExercise } from 'src/entity/saved-exercises';
import { SavedWorkout } from 'src/entity/saved-workouts';
import { WorkoutCollection } from 'src/entity/workout-collection';
import { Workout } from 'src/entity/workout.entity';
import { SavedWorkoutCollection } from 'src/entity/saved-workout-collection';
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

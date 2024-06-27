import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutCollection } from 'src/entity/workout-collection';
import { WorkoutCollectionDetails } from 'src/entity/workout-collection-details';
import { WorkoutCollectionService } from './workoutcollection.service';
import { WorkoutCollectionController } from './workoutcollection.controller';
import { Workout } from 'src/entity/workout.entity';
import { User } from 'src/entity/user.entity';
import { SavedWorkoutCollection } from 'src/entity/saved-workout-collection';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkoutCollection,
      WorkoutCollectionDetails,
      Workout,
      User,
      SavedWorkoutCollection,
    ]),
  ],
  providers: [WorkoutCollectionService],
  controllers: [WorkoutCollectionController],
})
export class WorkoutCollectionModule {}

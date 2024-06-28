import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutCollection } from '../../entity/workout-collection';
import { WorkoutCollectionDetails } from '../../entity/workout-collection-details';
import { WorkoutCollectionService } from './workoutcollection.service';
import { WorkoutCollectionController } from './workoutcollection.controller';
import { Workout } from '../../entity/workout.entity';
import { User } from '../../entity/user.entity';
import { SavedWorkoutCollection } from '../../entity/saved-workout-collection';

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

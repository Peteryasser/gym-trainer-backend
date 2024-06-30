import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutCollection } from '../../entity/workout-collection.entity';
import { WorkoutCollectionDetails } from '../../entity/workout-collection-details.entity';
import { WorkoutCollectionService } from './workoutcollection.service';
import { WorkoutCollectionController } from './workoutcollection.controller';
import { Workout } from '../../entity/workout.entity';
import { User } from '../../entity/user.entity';
import { SavedWorkoutCollection } from '../../entity/saved-workout-collection.entity';

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

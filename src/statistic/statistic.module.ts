import { Module } from '@nestjs/common';
import { StatisticService } from './service/statistic/service.service';
import { StatisticController } from './controller/statistic/controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { WorkoutHistory } from '../entity/user-workout-history.entity';
import { Measurements } from '../entity/measurements.entity';
import { Muscle } from '../entity/muscle.entity';
import { Exercise } from '../entity/exercise.entity';
import { Workout } from '../entity/workout.entity';
import { WorkoutExerciseDetails } from '../entity/workout-exercise-details.entity';


@Module({
  imports: [TypeOrmModule.forFeature([WorkoutHistory,User,Measurements,Muscle,Exercise,Workout,WorkoutExerciseDetails])],
  providers: [StatisticService],
  controllers: [StatisticController]

})
export class StatisticModule {}

import { Module } from '@nestjs/common';
import { StatisticService } from './service/statistic/service.service';
import { StatisticController } from './controller/statistic/controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { WorkoutHistory } from 'src/entity/user-workout-history.entity';
import { Measurements } from 'src/entity/measurements.entity';
import { Muscle } from 'src/entity/muscle.entity';
import { Exercise } from 'src/entity/exercise.entity';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutExerciseDetails } from 'src/entity/workout-exercise-details.entity';


@Module({
  imports: [TypeOrmModule.forFeature([WorkoutHistory,User,Measurements,Muscle,Exercise,Workout,WorkoutExerciseDetails])],
  providers: [StatisticService],
  controllers: [StatisticController]

})
export class StatisticModule {}

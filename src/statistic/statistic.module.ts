import { Module } from '@nestjs/common';
import { StatisticService } from './service/statistic/service.service';
import { StatisticController } from './controller/statistic/controller.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { WorkoutHistory } from 'src/entity/user-workout-history';

@Module({
  imports: [TypeOrmModule.forFeature([WorkoutHistory,User])],
  providers: [StatisticService],
  controllers: [StatisticController]
})
export class StatisticModule {}

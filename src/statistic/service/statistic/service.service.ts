import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutHistory } from 'src/entity/user-workout-history';
import { ConnectionManager } from 'src/config/connection_manager';

dotenvConfig({ path: '.env' });
@Injectable()
export class StatisticService {
      constructor( @InjectRepository(User)
      private usersRepository: Repository<User>,
      private workoutHistoryRepository: Repository<WorkoutHistory>,
    ) {}

      async findOneById(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
      }

      async getMyHistory(id: number): Promise<WorkoutHistory> {
        const workoutHistory = await this.workoutHistoryRepository.findOneBy({id});
        if (!workoutHistory) throw new NotFoundException('WorkoutHistory not found');
        return workoutHistory;
      }
       /* async getMyHistory(user: User): Promise<WorkoutHistory[]> {
          const connection = await ConnectionManager.getConnection();
      
          const workoutHistory = await connection.manager.find(WorkoutHistory, {
            where: { user: { id: user.id } },
            relations: [
              'workout',
              'workout.workoutExercises',
              'workout.workoutExercises.exercise',
              'workout.workoutExercises.exercise.bodyPart',
              'workout.workoutExercises.exercise.targetMuscle',
              'workout.workoutExercises.exercise.secondaryMuscles',
              'workout.workoutExercises.exercise.equipments',
              'workout.workoutExercises.workoutExerciseDetails',
            ],
          });
      
          return workoutHistory;
        }*/
}

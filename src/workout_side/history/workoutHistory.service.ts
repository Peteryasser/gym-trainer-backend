import { User } from 'src/entity/user.entity';
import { WorkoutHistoryDTO } from './dtos/workoutHistory_dto';
import { WorkoutHistory } from 'src/entity/user-workout-history';
import { config as dotenvConfig } from 'dotenv';
import { ConnectionManager } from 'src/config/connection_manager';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { Workout } from 'src/entity/workout.entity';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutHistoryService {
  constructor() {}

  async addWorkoutHistory(
    dto: WorkoutHistoryDTO,
    user: User,
    workout_id,
  ): Promise<WorkoutHistory> {
    const connection = await ConnectionManager.getConnection();

    const workout = await connection.manager.findOne(Workout, {
      where: { id: workout_id },
      relations: [
        'workoutExercises',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    const workoutHistory = new WorkoutHistory();
    workoutHistory.user = user;
    workoutHistory.workout = workout;
    workoutHistory.date = new Date();
    workoutHistory.numberOfSets = dto.weights.length;
    workoutHistory.weights = dto.weights;
    workoutHistory.duration = dto.duration;
    workoutHistory.durationUnit = dto.durationUnit;

    await connection.manager.save(workoutHistory);
    return workoutHistory;
  }

  async getMyHistory(user: User): Promise<WorkoutHistory[]> {
    const connection = await ConnectionManager.getConnection();

    const workoutHistory = await connection.manager.find(WorkoutHistory, {
      where: { user: { id: user.id } },
      relations: ['workout'],
    });

    return workoutHistory;
  }

  async deleteWorkoutHistory(id: number, user: User): Promise<void> {
    const connection = await ConnectionManager.getConnection();

    const workoutHistory = await connection.manager.findOne(WorkoutHistory, {
      where: { id, user: { id: user.id } },
    });

    if (!workoutHistory) {
      throw new NotFoundException('Workout History not found');
    }

    await connection.manager.remove(workoutHistory);
  }
}

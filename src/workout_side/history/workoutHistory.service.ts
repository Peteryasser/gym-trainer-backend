import { User } from '../../entity/user.entity';
import { WorkoutHistoryDTO } from './dtos/workoutHistory_dto';
import { WorkoutHistory } from '../../entity/user-workout-history';
import { config as dotenvConfig } from 'dotenv';
import { ConnectionManager } from '../../config/connection_manager';
import { Injectable } from '@nestjs/common';
import { Workout } from '../../entity/workout.entity';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutHistoryService {
  constructor() {}

  async addWorkoutHistory(
    dto: WorkoutHistoryDTO,
    user: User,
    workout_id: number,
  ) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    const workout = await connection.manager.findOne(Workout, {
      where: { id: workout_id },
      relations: [
        'workoutExercises',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    if (!workout) {
      message = 'Workout not found';
      return message;
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
    message = 'Workout History added successfully';
    return message;
  }

  async getMyHistory(user: User): Promise<WorkoutHistory[]> {
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
  }

  async deleteWorkoutHistory(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    const workoutHistory = await connection.manager.findOne(WorkoutHistory, {
      where: { id, user: { id: user.id } },
    });

    if (!workoutHistory) {
      message = 'Workout History not found';
      return message;
    }

    await connection.manager.remove(workoutHistory);
    message = 'Workout History deleted successfully';
    return message;
  }
}

import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { WorkoutPlanDto } from './dtos/workout_plan_dto';
import { User } from '../../entity/user.entity';
import { ConnectionManager } from '../../config/connection_manager';
import { WorkoutCollection } from '../../entity/workout-collection.entity';
import { WorkoutPlan } from '../../entity/workout-plan.entity';
import { WorkoutPlanDetails } from '../../entity/workout-plan-details.entity';
import { WorkoutPlanUpdateDto } from './dtos/workout_plan_update_dto';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutPlanService {
  constructor() {}

  async createWorkoutPlan(workoutPlanDto: WorkoutPlanDto, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    console.log('Start Checking workout collections');
    console.log(
      'Workout Collection IDs ',
      workoutPlanDto.workout_collection_ids,
    );

    for (const workoutCollectionId of workoutPlanDto.workout_collection_ids) {
      console.log('Workout Collection ID ', workoutCollectionId);
      const workoutCollection = await connection.manager.findOne(
        WorkoutCollection,
        {
          where: { id: workoutCollectionId },
          relations: ['user'],
        },
      );

      console.log('Workout Collection ', workoutCollection);

      if (!workoutCollection) {
        message = `WorkoutCollection with id ${workoutCollectionId} not found`;
        return message;
      }

      if (
        workoutCollection.type &&
        (!workoutCollection.user || workoutCollection.user.id !== user.id)
      ) {
        message = `You are not authorized to add workout with id ${workoutCollectionId} to your collection`;
        return message;
      }
    }

    console.log('Finish Checking workout collections');

    // Create workout collection
    const workoutPlan = connection.manager.create(WorkoutPlan, {
      name: workoutPlanDto.name,
      description: workoutPlanDto.description,
      startTime: workoutPlanDto.startDate,
      endTime: workoutPlanDto.endDate,
      type: true,
      user,
    });

    await connection.manager.save(workoutPlan);

    // Add workouts to workout collection by using WorkoutCollectionDetails
    for (const workoutCollectionId of workoutPlanDto.workout_collection_ids) {
      const workoutCollection = await connection.manager.findOne(
        WorkoutCollection,
        {
          where: { id: workoutCollectionId },
          relations: ['user'],
        },
      );

      const workoutPlanDetails = connection.manager.create(WorkoutPlanDetails, {
        workoutPlan,
        workoutCollection,
      });

      await connection.manager.save(workoutPlanDetails);
    }

    message = 'Workout Plan created successfully';

    return message;
  }

  async deleteWorkoutPlan(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // Find the workout plan
    const workoutPlan = await connection.manager.findOne(WorkoutPlan, {
      where: { id },
      relations: ['user'],
    });

    if (!workoutPlan) {
      message = `Workout Plan with id ${id} not found`;
      return message;
    }

    if (workoutPlan.user.id !== user.id) {
      message = `You are not authorized to delete workout plan with id ${id}`;
      return message;
    }

    await connection.manager.delete(WorkoutPlan, id);

    message = 'Workout Plan deleted successfully';

    return message;
  }

  async getMyPlans(user: User) {
    const connection = await ConnectionManager.getConnection();

    const workoutPlans = await connection.manager.find(WorkoutPlan, {
      where: { user: { id: user.id } },
      relations: [
        'workoutPlanDetails',
        'workoutPlanDetails.workoutCollection',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout',

        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
        'workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
      ],
    });

    return workoutPlans;
  }

  async updateWorkoutPlan(
    id: number,
    workoutPlanUpdateDto: WorkoutPlanUpdateDto,
    user: User,
  ) {
    let message = '';
    const connection = await ConnectionManager.getConnection();

    console.log('ID ', id);
    // Find the workout collection
    const workoutPlan = await connection.manager.findOne(WorkoutPlan, {
      where: { id },
      relations: ['user'],
    });

    if (!workoutPlan) {
      message = `Workout Plan with id ${id} not found`;
      return message;
    }

    if (workoutPlan.user.id !== user.id) {
      message = `You are not authorized to update workout Plan with id ${id}`;
      return message;
    }

    if (workoutPlanUpdateDto.name) {
      workoutPlan.name = workoutPlanUpdateDto.name;

      await connection.manager.save(workoutPlan);
    }

    if (workoutPlanUpdateDto.description) {
      workoutPlan.description = workoutPlanUpdateDto.description;

      await connection.manager.save(workoutPlan);
    }

    if (workoutPlanUpdateDto.startDate) {
      workoutPlan.startTime = workoutPlanUpdateDto.startDate;

      await connection.manager.save(workoutPlan);
    }

    if (workoutPlanUpdateDto.endDate) {
      workoutPlan.endTime = workoutPlanUpdateDto.endDate;

      await connection.manager.save(workoutPlan);
    }

    if (workoutPlanUpdateDto.workout_collection_ids) {
      await connection.manager.delete(WorkoutPlanDetails, {
        workoutPlan: { id },
      });

      for (const workoutCollectionId of workoutPlanUpdateDto.workout_collection_ids) {
        const workoutCollection = await connection.manager.findOne(
          WorkoutCollection,
          {
            where: { id: workoutCollectionId },
          },
        );

        if (!workoutCollection) {
          message = `Workout Collection with id ${workoutCollectionId} not found`;
          return message;
        }

        if (workoutCollection.type && workoutCollection.user.id !== user.id) {
          message = `You are not authorized to add workout collection with id ${workoutCollectionId} to your plan`;
          return message;
        }

        const workoutPlanDetails = connection.manager.create(
          WorkoutPlanDetails,
          {
            workoutPlan,
            workoutCollection,
          },
        );

        await connection.manager.save(workoutPlanDetails);
      }
    }

    message = 'Workout Plan updated successfully';
    return message;
  }
}

import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entity/user.entity';
import { WorkoutCollectionDto } from './dtos/workout_collection_dto';
import { ConnectionManager } from 'src/config/connection_manager';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutCollection } from 'src/entity/workout-collection';
import { WorkoutCollectionDetails } from 'src/entity/workout-collection-details';
import { WorkoutCollectionUpdateDto } from './dtos/workout_collection_update_dto';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutCollectionService {
  constructor() {}

  async createWorkoutCollection(
    user: User,
    createWorkoutCollectionDto: WorkoutCollectionDto,
  ) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // LOOP ON workout ids in workout collection dto and make sure that each on is
    // exist in data base and (type == false or type == true and user id == user.id)
    for (const workoutId of createWorkoutCollectionDto.workout_ids) {
      const workout = await connection.manager.findOne(Workout, {
        where: { id: workoutId },
        relations: ['user'],
      });

      if (!workout) {
        message = `Workout with id ${workoutId} not found`;
        return message;
      }

      if (workout.type && workout.user.id !== user.id) {
        message = `You are not authorized to add workout with id ${workoutId} to your collection`;
        return message;
      }
    }

    // Create workout collection
    const workoutCollection = connection.manager.create(WorkoutCollection, {
      name: createWorkoutCollectionDto.name,
      description: createWorkoutCollectionDto.description,
      type: true,
      user,
    });

    await connection.manager.save(workoutCollection);

    // Add workouts to workout collection by using WorkoutCollectionDetails
    for (const workoutId of createWorkoutCollectionDto.workout_ids) {
      const workout = await connection.manager.findOne(Workout, {
        where: { id: workoutId },
      });

      const workoutCollectionDetails = connection.manager.create(
        WorkoutCollectionDetails,
        {
          workoutCollection,
          workout,
        },
      );

      await connection.manager.save(workoutCollectionDetails);
    }

    message = 'Workout collection created successfully';

    return message;
  }

  async deleteWorkoutCollection(user: User, id: number) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // Find the workout collection
    const workoutCollection = await connection.manager.findOne(
      WorkoutCollection,
      {
        where: { id },
        relations: ['user'],
      },
    );

    if (!workoutCollection) {
      message = `Workout collection with id ${id} not found`;
      return message;
    }

    if (workoutCollection.user.id !== user.id) {
      message = `You are not authorized to delete workout collection with id ${id}`;
      return message;
    }

    // Delete the workout collection
    await connection.manager.remove(workoutCollection);

    message = 'Workout collection deleted successfully';

    return message;
  }

  async getMyCollections(user: User) {
    const connection = await ConnectionManager.getConnection();

    const workoutCollections = await connection.manager.find(
      WorkoutCollection,
      {
        where: { user: { id: user.id } },
        relations: [
          'workoutCollectionDetails',
          'workoutCollectionDetails.workout',
        ],
      },
    );

    return workoutCollections;
  }

  async getDefaultCollections() {
    const connection = await ConnectionManager.getConnection();

    const workoutCollections = await connection.manager.find(
      WorkoutCollection,
      {
        where: { type: false },
        relations: [
          'workoutCollectionDetails',
          'workoutCollectionDetails.workout',
        ],
      },
    );

    return workoutCollections;
  }

  async updateWorkoutCollection(
    user: User,
    id: number,
    updateWorkoutCollectionDto: WorkoutCollectionUpdateDto,
  ) {
    let message = '';
    const connection = await ConnectionManager.getConnection();

    console.log('ID ', id);
    // Find the workout collection
    const workoutCollection = await connection.manager.findOne(
      WorkoutCollection,
      {
        where: { id },
        relations: ['user'],
      },
    );

    if (!workoutCollection) {
      message = `Workout collection with id ${id} not found`;
      return message;
    }

    if (workoutCollection.user.id !== user.id) {
      message = `You are not authorized to update workout collection with id ${id}`;
      return message;
    }

    if (updateWorkoutCollectionDto.name) {
      workoutCollection.name = updateWorkoutCollectionDto.name;
      // save the update to database
      await connection.manager.save(workoutCollection);
    }

    if (updateWorkoutCollectionDto.description) {
      workoutCollection.description = updateWorkoutCollectionDto.description;
      // save the update to database
      await connection.manager.save(workoutCollection);
    }

    if (updateWorkoutCollectionDto.workout_ids) {
      // Delete all workout collection details related to the workout collection
      await connection.manager.delete(WorkoutCollectionDetails, {
        workoutCollection: { id },
      });
      // Add new workout collection details
      for (const workoutId of updateWorkoutCollectionDto.workout_ids) {
        const workout = await connection.manager.findOne(Workout, {
          where: { id: workoutId },
        });

        if (workout.type && workout.user.id !== user.id) {
          message = `You are not authorized to add workout with id ${workoutId} to your collection`;
          return message;
        }

        const workoutCollectionDetails = connection.manager.create(
          WorkoutCollectionDetails,
          {
            workoutCollection,
            workout,
          },
        );

        await connection.manager.save(workoutCollectionDetails);
      }
    }

    message = 'Workout collection updated successfully';
    return message;
  }
}

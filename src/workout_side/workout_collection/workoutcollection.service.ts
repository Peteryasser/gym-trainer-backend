import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { User } from '../../entity/user.entity';
import { WorkoutCollectionDto } from './dtos/workout_collection_dto';
import { ConnectionManager } from '../../config/connection_manager';
import { Workout } from '../../entity/workout.entity';
import { WorkoutCollection } from '../../entity/workout-collection.entity';
import { WorkoutCollectionDetails } from '../../entity/workout-collection-details.entity';
import { WorkoutCollectionUpdateDto } from './dtos/workout_collection_update_dto';
import { WorkoutService } from '../../workout_side/workout/workout.service';

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

    // get instance of workout service
    const workoutService = new WorkoutService();
    // initialize array of numbers named workoutIds
    const workoutIds: number[] = [];

    // iterate on list of WorkoutDTOs in WorkoutCollection
    for (const workoutdto of createWorkoutCollectionDto.workouts) {
      const workoutId = workoutService.addWorkoutForCollections(
        user,
        workoutdto,
      );

      console.log('workoutId', await workoutId);
      if ((await workoutId) == -1) return 'Exercise Not Found';
      workoutIds.push(await workoutId);
    }

    // Create workout collection
    const workoutCollection = connection.manager.create(WorkoutCollection, {
      name: createWorkoutCollectionDto.name,
      description: createWorkoutCollectionDto.description,
      type: true,
      creationDate: new Date(),
      user,
    });

    await connection.manager.save(workoutCollection);

    // Add workouts to workout collection by using WorkoutCollectionDetails
    for (const workoutId of workoutIds) {
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

  async getDeaultCollectionsInfo() {
    const connection = await ConnectionManager.getConnection();

    // i want to get only id and name
    const workoutCollections = await connection.manager.find(
      WorkoutCollection,
      {
        where: { type: false },
        select: ['id', 'name'],
      },
    );
    return workoutCollections;
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
          'workoutCollectionDetails.workout.workoutExercises',
          'workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
        ],
      },
    );

    console.log(workoutCollections.length);

    return workoutCollections;
  }

  async getCollection(id: number) {
    const connection = await ConnectionManager.getConnection();

    const workoutCollection = await connection.manager.findOne(
      WorkoutCollection,
      {
        where: { id },
        relations: [
          'workoutCollectionDetails',
          'workoutCollectionDetails.workout',
          'workoutCollectionDetails.workout.workoutExercises',
          'workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
        ],
      },
    );

    return workoutCollection;
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
          'workoutCollectionDetails.workout.workoutExercises',
          'workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
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
      await connection.manager.save(workoutCollection);
    }

    if (updateWorkoutCollectionDto.description) {
      workoutCollection.description = updateWorkoutCollectionDto.description;
      await connection.manager.save(workoutCollection);
    }

    if (updateWorkoutCollectionDto.workouts) {
      // Delete all workout collection details related to the workout collection
      await connection.manager.delete(WorkoutCollectionDetails, {
        workoutCollection: { id },
      });

      const workoutService = new WorkoutService();
      const workoutIds: number[] = [];

      // iterate on list of WorkoutDTOs in WorkoutCollection
      for (const workoutdto of updateWorkoutCollectionDto.workouts) {
        const workoutId = workoutService.addWorkoutForCollections(
          user,
          workoutdto,
        );

        console.log('workoutId', await workoutId);
        if ((await workoutId) == -1) return 'Exercise Not Found';
        workoutIds.push(await workoutId);
      }

      for (const workoutId of workoutIds) {
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
    }

    message = 'Workout collection updated successfully';
    return message;
  }
}

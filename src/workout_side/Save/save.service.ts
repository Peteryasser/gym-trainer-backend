import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { config as dotenvConfig } from 'dotenv';
import { ConnectionManager } from 'src/config/connection_manager';
import { Exercise } from 'src/entity/exercise.entity';
import { SavedExercise } from 'src/entity/saved-exercises';
import { Workout } from 'src/entity/workout.entity';
import { SavedWorkout } from 'src/entity/saved-workouts';
import { WorkoutCollection } from 'src/entity/workout-collection';
import { SavedWorkoutCollection } from 'src/entity/saved-workout-collection';
import { retry } from 'rxjs';

dotenvConfig({ path: '.env' });
@Injectable()
export class SaveService {
  constructor() {}

  async saveExercise(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';
    const exercise = await connection.manager.findOne(Exercise, {
      where: { id },
    });

    if (!exercise) {
      message = 'Exercise not found';
      return message;
    }

    const savedExercise = new SavedExercise();
    savedExercise.user = user;
    savedExercise.exercise = exercise;

    console.log('savedExercise', savedExercise);

    await connection.manager.save(savedExercise);
    return 'Exercise saved successfully';
  }

  async unsaveExercise(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // make sure that record of saved_execise with this id is have user_id of the user
    const savedExercise = await connection.manager.findOne(SavedExercise, {
      where: { id, user: { id: user.id } },
    });

    if (!savedExercise) {
      message = 'Exercise not found in your saved exercises';
      return message;
    }

    // delete entity from saved_exercises table with this id
    await connection.manager.delete(SavedExercise, { id });
    return 'Exercise unsaved successfully';
  }

  async saveWorkout(id: number, user: User) {
    // add workout to user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find workout with this id
    const workout = await connection.manager.findOne(Workout, {
      where: { id },
    });

    // if workout not found, throw exception
    if (!workout) {
      return 'Workout not found';
    }

    // create new saved_workout entity
    const savedWorkout = new SavedWorkout();
    savedWorkout.user = user;
    savedWorkout.workout = workout;

    // save saved_workout entity
    await connection.manager.save(savedWorkout);
    return 'Workout saved successfully';
  }

  async unsaveWorkout(id: number, user: User) {
    // remove workout from user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find saved_workout entity with this id
    const savedWorkout = await connection.manager.findOne(SavedWorkout, {
      where: { id, user: { id: user.id } },
    });

    // if saved_workout entity not found, throw exception
    if (!savedWorkout) {
      return 'Workout not found in your saved workouts';
    }

    // delete saved_workout entity with this id
    await connection.manager.delete(SavedWorkout, { id });
    return 'Workout unsaved successfully';
  }

  async saveWorkoutCollection(id: number, user: User) {
    // add workout collection to user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find workout with this id
    const workoutCollection = await connection.manager.findOne(
      WorkoutCollection,
      {
        where: { id },
      },
    );

    // if workout not found, throw exception
    if (!workoutCollection) {
      return 'WorkoutCollection not found';
    }

    const savedWorkoutCollection = new SavedWorkoutCollection();
    savedWorkoutCollection.user = user;
    savedWorkoutCollection.workoutCollection = workoutCollection;

    await connection.manager.save(savedWorkoutCollection);
    return 'WorkoutCollection saved successfully';
  }

  async unsaveWorkoutCollection(id: number, user: User) {
    // remove workout collection from user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find saved_workout entity with this id
    const savedWorkoutCollection = await connection.manager.findOne(
      SavedWorkoutCollection,
      {
        where: { id, user: { id: user.id } },
      },
    );

    // if saved_workout entity not found, throw exception
    if (!savedWorkoutCollection) {
      return 'WorkoutCollection not found in your saved workouts';
    }

    // delete saved_workout entity with this id
    await connection.manager.delete(SavedWorkoutCollection, { id });
    return 'WorkoutCollection unsaved successfully';
  }

  async getSavedExercises(user: User): Promise<any[]> {
    const connection = await ConnectionManager.getConnection();

    const savedExercises = await connection.manager.find(SavedExercise, {
      where: { user: { id: user.id } },
      relations: [
        'exercise',
        'exercise.bodyPart',
        'exercise.targetMuscle',
        'exercise.secondaryMuscles',
        'exercise.equipments',
        'exercise.instructions',
      ],
    });

    return savedExercises;
  }

  async getSavedWorkouts(user: User): Promise<any[]> {
    const connection = await ConnectionManager.getConnection();

    // Get the saved workouts with related details
    const savedWorkouts = await connection.manager.find(SavedWorkout, {
      where: { user: { id: user.id } },
      relations: [
        'workout',
        'workout.workoutExercises',
        'workout.workoutExercises.exercise',
        'workout.workoutExercises.exercise.bodyPart',
        'workout.workoutExercises.exercise.targetMuscle',
        'workout.workoutExercises.exercise.secondaryMuscles',
        'workout.workoutExercises.exercise.equipments',
        'workout.workoutExercises.exercise.instructions',
        'workout.workoutExercises.workoutExerciseDetails',
      ],
    });

    return savedWorkouts;
  }

  async getSavedWorkoutCollections(user: User): Promise<any[]> {
    const connection = await ConnectionManager.getConnection();

    // Get the saved workout collections with related details
    const savedWorkoutCollections = await connection.manager.find(
      SavedWorkoutCollection,
      {
        where: { user: { id: user.id } },
        relations: [
          'workoutCollection',
          'workoutCollection.workoutCollectionDetails',
          'workoutCollection.workoutCollectionDetails.workout',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
        ],
      },
    );

    return savedWorkoutCollections;
  }
}

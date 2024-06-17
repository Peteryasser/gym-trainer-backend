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

dotenvConfig({ path: '.env' });
@Injectable()
export class SaveService {
  constructor() {}

  async saveExercise(id: number, user: User): Promise<void> {
    const connection = await ConnectionManager.getConnection();

    const exercise = await connection.manager.findOne(Exercise, {
      where: { id },
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const savedExercise = new SavedExercise();
    savedExercise.user = user;
    savedExercise.exercise = exercise;

    await connection.manager.save(savedExercise);
  }

  async unsaveExercise(id: number, user: User): Promise<void> {
    const connection = await ConnectionManager.getConnection();

    // make sure that record of saved_execise with this id is have user_id of the user
    const savedExercise = await connection.manager.findOne(SavedExercise, {
      where: { id, user: { id: user.id } },
    });

    if (!savedExercise) {
      throw new NotFoundException('Exercise not found in your saved exercises');
    }

    // delete entity from saved_exercises table with this id
    await connection.manager.delete(SavedExercise, { id });
  }

  async saveWorkout(id: number, user: User): Promise<void> {
    // add workout to user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find workout with this id
    const workout = await connection.manager.findOne(Workout, {
      where: { id },
    });

    // if workout not found, throw exception
    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    // create new saved_workout entity
    const savedWorkout = new SavedWorkout();
    savedWorkout.user = user;
    savedWorkout.workout = workout;

    // save saved_workout entity
    await connection.manager.save(savedWorkout);
  }

  async unsaveWorkout(id: number, user: User): Promise<void> {
    // remove workout from user's saved workouts

    // get connection
    const connection = await ConnectionManager.getConnection();

    // find saved_workout entity with this id
    const savedWorkout = await connection.manager.findOne(SavedWorkout, {
      where: { id, user: { id: user.id } },
    });

    // if saved_workout entity not found, throw exception
    if (!savedWorkout) {
      throw new NotFoundException('Workout not found in your saved workouts');
    }

    // delete saved_workout entity with this id
    await connection.manager.delete(SavedWorkout, { id });
  }

  async saveWorkoutCollection(id: number, user: User): Promise<void> {
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
      throw new NotFoundException('WorkoutCollection not found');
    }

    const savedWorkoutCollection = new SavedWorkoutCollection();
    savedWorkoutCollection.user = user;
    savedWorkoutCollection.workoutCollection = workoutCollection;

    await connection.manager.save(savedWorkoutCollection);
  }

  async unsaveWorkoutCollection(id: number, user: User): Promise<void> {
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
      throw new NotFoundException(
        'WorkoutCollection not found in your saved workouts',
      );
    }

    // delete saved_workout entity with this id
    await connection.manager.delete(SavedWorkoutCollection, { id });
  }
}

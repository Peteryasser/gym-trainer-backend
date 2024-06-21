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

    console.log('savedExercise', savedExercise);

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
      ],
    });

    // Format the response to include the necessary details
    const response = savedExercises.map((savedExercise) => ({
      id: savedExercise.id,
      exercise: {
        id: savedExercise.exercise.id,
        name: savedExercise.exercise.name,
        idApi: savedExercise.exercise.idApi,
        gifUrl: savedExercise.exercise.gifUrl,
        type: savedExercise.exercise.type,
        bodyPart: savedExercise.exercise.bodyPart
          ? savedExercise.exercise.bodyPart.name
          : null,
        targetMuscle: savedExercise.exercise.targetMuscle
          ? savedExercise.exercise.targetMuscle.name
          : null,
        secondaryMuscles: savedExercise.exercise.secondaryMuscles
          ? savedExercise.exercise.secondaryMuscles.map((muscle) => muscle.name)
          : [],
        equipments: savedExercise.exercise.equipments
          ? savedExercise.exercise.equipments.map((equipment) => equipment.name)
          : [],
      },
    }));

    return response;
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
        'workout.workoutExercises.workoutExerciseDetails',
      ],
    });

    // Format the response to include the necessary details
    const response = savedWorkouts.map((savedWorkout) => ({
      id: savedWorkout.id,
      workout: {
        id: savedWorkout.workout.id,
        type: savedWorkout.workout.type,
        description: savedWorkout.workout.description,
        exercises: savedWorkout.workout.workoutExercises.map(
          (workoutExercise) => ({
            id: workoutExercise.exercise.id,
            name: workoutExercise.exercise.name,
            idApi: workoutExercise.exercise.idApi,
            gifUrl: workoutExercise.exercise.gifUrl,
            type: workoutExercise.exercise.type,
            bodyPart: workoutExercise.exercise.bodyPart
              ? workoutExercise.exercise.bodyPart.name
              : null,
            targetMuscle: workoutExercise.exercise.targetMuscle
              ? workoutExercise.exercise.targetMuscle.name
              : null,
            secondaryMuscles: workoutExercise.exercise.secondaryMuscles
              ? workoutExercise.exercise.secondaryMuscles.map(
                  (muscle) => muscle.name,
                )
              : [],
            equipments: workoutExercise.exercise.equipments
              ? workoutExercise.exercise.equipments.map(
                  (equipment) => equipment.name,
                )
              : [],
            details: workoutExercise.workoutExerciseDetails.map((detail) => ({
              sets: detail.sets,
              weights: detail.weights,
              reps: detail.reps,
              duration: detail.duration,
              durationUnit: detail.durationUnit,
            })),
          }),
        ),
      },
    }));

    return response;
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
          'workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
        ],
      },
    );

    // Format the response to include the necessary details
    const response = savedWorkoutCollections.map((savedWorkoutCollection) => ({
      id: savedWorkoutCollection.id,
      name: savedWorkoutCollection.workoutCollection.name,
      description: savedWorkoutCollection.workoutCollection.description,
      type: savedWorkoutCollection.workoutCollection.type,
      workouts:
        savedWorkoutCollection.workoutCollection.workoutCollectionDetails.map(
          (collectionDetail) => ({
            id: collectionDetail.workout.id,
            type: collectionDetail.workout.type,
            description: collectionDetail.workout.description,
            exercises: collectionDetail.workout.workoutExercises.map(
              (workoutExercise) => ({
                id: workoutExercise.exercise.id,
                name: workoutExercise.exercise.name,
                idApi: workoutExercise.exercise.idApi,
                gifUrl: workoutExercise.exercise.gifUrl,
                type: workoutExercise.exercise.type,
                bodyPart: workoutExercise.exercise.bodyPart
                  ? workoutExercise.exercise.bodyPart.name
                  : null,
                targetMuscle: workoutExercise.exercise.targetMuscle
                  ? workoutExercise.exercise.targetMuscle.name
                  : null,
                secondaryMuscles: workoutExercise.exercise.secondaryMuscles
                  ? workoutExercise.exercise.secondaryMuscles.map(
                      (muscle) => muscle.name,
                    )
                  : [],
                equipments: workoutExercise.exercise.equipments
                  ? workoutExercise.exercise.equipments.map(
                      (equipment) => equipment.name,
                    )
                  : [],
                details: workoutExercise.workoutExerciseDetails.map(
                  (detail) => ({
                    sets: detail.sets,
                    weights: detail.weights,
                    reps: detail.reps,
                    duration: detail.duration,
                    durationUnit: detail.durationUnit,
                  }),
                ),
              }),
            ),
          }),
        ),
    }));

    return response;
  }
}

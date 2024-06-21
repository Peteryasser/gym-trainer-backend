import { Injectable, NotFoundException } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { ConnectionManager } from 'src/config/connection_manager';
import { Exercise } from 'src/entity/exercise.entity';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutExerciseDetails } from 'src/entity/workout-exercise-details';
import { WorkoutExercise } from 'src/entity/workout-exercise';
import { WorkoutDto } from './dtos/workout.dto';
import { User } from 'src/entity/user.entity';
import { WorkoutUpdateDto } from './dtos/workout.update.dto';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutService {
  constructor() {}

  async getMyWorkouts(user: User): Promise<Workout[]> {
    const connection = await ConnectionManager.getConnection();

    const workouts = await connection.manager.find(Workout, {
      where: { user: { id: user.id } },
      relations: [
        'workoutExercises',
        'workoutExercises.exercise',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    return workouts;
  }

  async deleteWorkout(user: User, workoutId: number): Promise<void> {
    const connection = await ConnectionManager.getConnection();

    const workout = await connection.manager.findOne(Workout, {
      where: { id: workoutId, user: { id: user.id } },
      relations: [
        'workoutExercises',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    // if (workout.user.id !== user.id) {
    //   throw new ForbiddenException(
    //     'You are not authorized to delete this workout',
    //   );
    // }

    // Delete related workout_exercise_details
    for (const workoutExercise of workout.workoutExercises) {
      await connection.manager.remove(
        WorkoutExerciseDetails,
        workoutExercise.workoutExerciseDetails,
      );
    }

    // Delete related workout_exercises
    await connection.manager.remove(WorkoutExercise, workout.workoutExercises);

    // Delete the workout itself
    await connection.manager.remove(Workout, workout);
  }
  async getMyWorkoutsSummary(user: User): Promise<Workout[]> {
    const connection = await ConnectionManager.getConnection();

    const workouts = await connection.manager.find(Workout, {
      where: { user: { id: user.id } },
      relations: [
        'workoutExercises',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    return workouts;
  }
  async createWorkout(user: User, createWorkoutDto: WorkoutDto) {
    console.log('createWorkout');
    console.log('createWorkoutDto', createWorkoutDto);
    console.log('user', user);

    const connection = await ConnectionManager.getConnection();

    // Find the exercise by id
    const exercise = await connection.manager.findOne(Exercise, {
      where: { id: createWorkoutDto.exerciseId },
    });

    if (!exercise) {
      throw new NotFoundException(
        `Exercise with ID ${createWorkoutDto.exerciseId} not found`,
      );
    }

    const workout = new Workout();
    workout.description = createWorkoutDto.description;
    workout.user = user;
    workout.type = true;

    try {
      await connection.manager.save(workout);
      console.log('Workout created successfully', workout);
    } catch (e) {
      console.log(e);
    }

    // Create the workout exercise entity
    const workoutExercise = new WorkoutExercise();
    workoutExercise.workout = workout;
    workoutExercise.exercise = exercise;

    try {
      await connection.manager.save(workoutExercise);
      console.log('WorkoutExercise created successfully', workoutExercise);
    } catch (e) {
      console.log(e);
    }

    // Create the workout exercise details entity
    const workoutExerciseDetails = new WorkoutExerciseDetails();
    workoutExerciseDetails.workoutExercise = workoutExercise;
    workoutExerciseDetails.sets = createWorkoutDto.setsNumber;
    workoutExerciseDetails.reps = createWorkoutDto.repsNumber;
    workoutExerciseDetails.weights = createWorkoutDto.weights;
    workoutExerciseDetails.duration = createWorkoutDto.duration;
    workoutExerciseDetails.durationUnit = createWorkoutDto.durationUnit;

    try {
      await connection.manager.save(workoutExerciseDetails);
      console.log(
        'WorkoutExerciseDetails created successfully',
        workoutExerciseDetails,
      );
    } catch (e) {
      console.log(e);
    }

    return workout;
  }

  async update(user: User, workoutid: number, updatedto: WorkoutUpdateDto) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // get the workout with id
    const workout = await connection.manager.findOne(Workout, {
      where: { id: workoutid },
      relations: [
        'user',
        'workoutExercises',
        'workoutExercises.exercise',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    console.log('workout', workout);
    console.log(
      'workout details',
      workout.workoutExercises[0].workoutExerciseDetails,
    );

    console.log('exercise', workout.workoutExercises[0].exercise);

    if (!workout) {
      message = 'Workout not found';
      return message;
    }

    if (!workout.user || workout.user.id != user.id) {
      message = 'You are not authorized to update this workout';
      return message;
    }

    if (updatedto.description) {
      workout.description = updatedto.description;
      await connection.manager.save(workout);
    }

    if (updatedto.setsNumber) {
      // get WorkoutExerciseDetails
      const workoutExerciseDetails = await connection.manager.findOne(
        WorkoutExerciseDetails,
        {
          where: {
            id: workout.workoutExercises[0].workoutExerciseDetails[0].id,
          },
        },
      );

      if (!workoutExerciseDetails) {
        message = 'WorkoutExerciseDetails not found';
        return message;
      }

      workoutExerciseDetails.sets = updatedto.setsNumber;
      // save it
      await connection.manager.save(workoutExerciseDetails);
    }

    if (updatedto.repsNumber) {
      // get WorkoutExerciseDetails
      const workoutExerciseDetails = await connection.manager.findOne(
        WorkoutExerciseDetails,
        {
          where: {
            id: workout.workoutExercises[0].workoutExerciseDetails[0].id,
          },
        },
      );

      if (!workoutExerciseDetails) {
        message = 'WorkoutExerciseDetails not found';
        return message;
      }

      workoutExerciseDetails.reps = updatedto.repsNumber;
      // save it
      await connection.manager.save(workoutExerciseDetails);
    }

    if (updatedto.weights) {
      // get WorkoutExerciseDetails
      const workoutExerciseDetails = await connection.manager.findOne(
        WorkoutExerciseDetails,
        {
          where: {
            id: workout.workoutExercises[0].workoutExerciseDetails[0].id,
          },
        },
      );

      if (!workoutExerciseDetails) {
        message = 'WorkoutExerciseDetails not found';
        return message;
      }

      workoutExerciseDetails.weights = updatedto.weights;
      // save it
      await connection.manager.save(workoutExerciseDetails);
    }

    if (updatedto.duration) {
      // get WorkoutExerciseDetails
      const workoutExerciseDetails = await connection.manager.findOne(
        WorkoutExerciseDetails,
        {
          where: {
            id: workout.workoutExercises[0].workoutExerciseDetails[0].id,
          },
        },
      );

      if (!workoutExerciseDetails) {
        message = 'WorkoutExerciseDetails not found';
        return message;
      }

      workoutExerciseDetails.duration = updatedto.duration;
      // save it
      await connection.manager.save(workoutExerciseDetails);
    }

    if (updatedto.durationUnit) {
      // get WorkoutExerciseDetails
      const workoutExerciseDetails = await connection.manager.findOne(
        WorkoutExerciseDetails,
        {
          where: {
            id: workout.workoutExercises[0].workoutExerciseDetails[0].id,
          },
        },
      );

      if (!workoutExerciseDetails) {
        message = 'WorkoutExerciseDetails not found';
        return message;
      }

      workoutExerciseDetails.durationUnit = updatedto.durationUnit;
      // save it
      await connection.manager.save(workoutExerciseDetails);
    }
    if (updatedto.exerciseId) {
      // Find the exercise by id
      const exercise = await connection.manager.findOne(Exercise, {
        where: { id: updatedto.exerciseId },
      });

      if (!exercise) {
        message = 'Exercise with this id not found';
        return message;
      }

      if (exercise.type && exercise.user.id == user.id) {
        message = 'You are not authorized to used this exercise';
        return message;
      }

      // get WorkoutExercise
      const workoutExercise = await connection.manager.findOne(
        WorkoutExercise,
        {
          where: { id: workout.workoutExercises[0].id },
        },
      );

      if (!workoutExercise) {
        // add the id that you don't find the workoutExercise to the message

        message = `workoutExercise not found for workout with id ${workout.id}`;
        return message;
      }

      workoutExercise.exercise = exercise;
      // save it
      await connection.manager.save(workoutExercise);
    }

    const updatedworkout = await connection.manager.findOne(Workout, {
      where: { id: workoutid },
      relations: [
        'user',
        'workoutExercises',
        'workoutExercises.exercise',
        'workoutExercises.workoutExerciseDetails',
      ],
    });

    console.log('workout', updatedworkout);
    console.log(
      'workout details',
      updatedworkout.workoutExercises[0].workoutExerciseDetails,
    );

    console.log('exercise', updatedworkout.workoutExercises[0].exercise);

    return 'Workout updated successfully';
  }
}

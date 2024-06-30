import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { User } from '../../entity/user.entity';
import { ConnectionManager } from '../../config/connection_manager';
import { WorkoutPlanPackageDTO } from './dtos/workout_package_dto';
import { Package } from '../../entity/coach-package.entity';
import { WorkoutPlan } from '../../entity/workout-plan.entity';
import { UserPackageWorkoutPlan } from '../../entity/user-package-workoutPlan.entity';
import { WorkoutPlanPackageUpdateDTO } from './dtos/workout_package_update';
import { Coach } from '../../entity/coach.entity';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutPlanPackageService {
  constructor() {}

  async addWorkoutPlanToPackage(
    workoutPlanPackageDto: WorkoutPlanPackageDTO,
    user: Coach,
  ) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // get user with trainee_id in dto and make sure it's exist
    const trainee = await connection.manager.findOne(User, {
      where: { id: workoutPlanPackageDto.trainee_id },
    });

    if (!trainee) {
      message = `Trainee with id ${workoutPlanPackageDto.trainee_id} not found`;
      return message;
    }

    // get package with package_id in dto and make sure it's exist
    const coachPackage = await connection.manager.findOne(Package, {
      where: { id: workoutPlanPackageDto.package_id },
      relations: ['coach'],
    });

    if (!coachPackage) {
      message = `Package with id ${workoutPlanPackageDto.package_id} not found`;
      return message;
    }

    if ((await coachPackage.coach).id !== user.id) {
      message = `You are not authorized to add workout plan to package with id ${workoutPlanPackageDto.package_id}`;
      return message;
    }

    // get workout plan with workout_plan_id in dto and make sure it's exist
    const workoutPlan = await connection.manager.findOne(WorkoutPlan, {
      where: { id: workoutPlanPackageDto.workout_plan_id },
      relations: ['user'],
    });

    if (!workoutPlan) {
      message = `Workout Plan with id ${workoutPlanPackageDto.workout_plan_id} not found`;
      return message;
    }

    console.log('workoutPlan.user', workoutPlan.user);

    if (workoutPlan.user.id !== user.id) {
      message = `You are not authorized to add workout plan with id ${workoutPlanPackageDto.workout_plan_id} to package`;
      return message;
    }

    console.log('workoutPlan', workoutPlan);
    console.log('coachPackage', coachPackage);
    console.log('trainee', trainee);

    const userPackageWorkoutPlan = new UserPackageWorkoutPlan();
    userPackageWorkoutPlan.user = trainee;
    userPackageWorkoutPlan.workoutPlan = workoutPlan;
    userPackageWorkoutPlan.package = coachPackage;

    console.log(userPackageWorkoutPlan);

    await connection.manager.save(userPackageWorkoutPlan);

    message = 'Workout Plan added to package successfully';
    return message;
  }

  async deleteWorkoutPlanfromPackage(id: number, user: Coach) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
        relations: ['package', 'package.coach'],
      },
    );

    console.log('userPackageWorkoutPlan', userPackageWorkoutPlan);

    if (!userPackageWorkoutPlan) {
      message = `Workout Plan with id ${id} not found in user's packages`;
      return message;
    }

    if (userPackageWorkoutPlan.package.coach.id !== user.id) {
      message = `You are not authorized to delete workout plan with id ${id}`;
      return message;
    }

    await connection.manager.delete(UserPackageWorkoutPlan, { id });

    message = 'Workout Plan deleted successfully';
    return message;
  }

  async getMyWorkoutPlansInPackage(user: User) {
    const connection = await ConnectionManager.getConnection();

    const userPackageWorkoutPlans = await connection.manager.find(
      UserPackageWorkoutPlan,
      {
        where: { user: { id: user.id } },
        relations: [
          'workoutPlan',
          'workoutPlan.workoutPlanDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
        ],
      },
    );

    return userPackageWorkoutPlans;
  }

  async getPlan(userId: number, coachId: number) {
    const connection = await ConnectionManager.getConnection();

    const userPackageWorkoutPlan = await connection
      .getRepository(UserPackageWorkoutPlan)
      .findOne({
        where: { user: { id: userId }, package: { coach: { id: coachId } } },
        relations: [
          'workoutPlan',
          'workoutPlan.workoutPlanDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
          'user',
          'package',
          'package.coach',
        ],
      });

    console.log('Veroooooo finish');
    console.log(userPackageWorkoutPlan);

    return userPackageWorkoutPlan;
  }

  async getWorkoutPlanInPackage(id: number) {
    // get connection
    const connection = await ConnectionManager.getConnection();

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
        relations: [
          'workoutPlan',
          'workoutPlan.workoutPlanDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.workoutExerciseDetails',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.bodyPart',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.targetMuscle',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.secondaryMuscles',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.equipments',
          'workoutPlan.workoutPlanDetails.workoutCollection.workoutCollectionDetails.workout.workoutExercises.exercise.instructions',
        ],
      },
    );

    // if user package workout plan not found, throw exception
    if (!userPackageWorkoutPlan) {
      return `Workout Plan with id ${id} not found in user's packages`;
    }

    return userPackageWorkoutPlan;
  }

  async updateWorkoutPlanInPackage(
    id: number,
    workoutPackageUpdateDTO: WorkoutPlanPackageUpdateDTO,
    user: Coach,
  ) {
    // get connection
    const connection = await ConnectionManager.getConnection();

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
        relations: ['package', 'package.coach'],
      },
    );

    console.log('userPackageWorkoutPlan', userPackageWorkoutPlan);

    // if user package workout plan not found, throw exception
    if (!userPackageWorkoutPlan) {
      return `Workout Plan with id ${id} not found in user's packages`;
    }

    if (userPackageWorkoutPlan.package.coach.id !== user.id) {
      return `You are not authorized to update workout plan with id ${id}`;
    }

    // find workout plan with workout_plan_id in dto and make sure it's exist
    const workoutPlan = await connection.manager.findOne(WorkoutPlan, {
      where: { id: workoutPackageUpdateDTO.workout_plan_id },
    });

    if (!workoutPlan) {
      return `Workout Plan with id ${workoutPackageUpdateDTO.workout_plan_id} not found`;
    }

    if (workoutPlan.user.id !== user.id) {
      return `You are not authorized to update workout plan with id ${workoutPackageUpdateDTO.workout_plan_id}`;
    }

    // update user package workout plan
    await connection.manager.update(
      UserPackageWorkoutPlan,
      { id },
      { workoutPlan: { id: workoutPackageUpdateDTO.workout_plan_id } },
    );

    return 'Workout Plan updated successfully';
  }
}

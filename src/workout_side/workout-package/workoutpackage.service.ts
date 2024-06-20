import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entity/user.entity';
import { ConnectionManager } from 'src/config/connection_manager';
import { WorkoutPlanPackageDTO } from './dtos/workout_package_dto';
import { Package } from 'src/entity/coach-package.entity';
import { WorkoutPlan } from 'src/entity/workout-plan';
import { UserPackageWorkoutPlan } from 'src/entity/user-package-workoutPlan';
import { WorkoutPlanPackageUpdateDTO } from './dtos/workout_package_update';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutPlanPackageService {
  constructor() {}

  async addWorkoutPlanToPackage(
    workoutPlanPackageDto: WorkoutPlanPackageDTO,
    user: User,
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
    });

    if (!coachPackage) {
      message = `Package with id ${workoutPlanPackageDto.package_id} not found`;
      return message;
    }
    if ((await coachPackage.coach.user).id !== user.id) {
      message = `You are not authorized to add workout plan to package with id ${workoutPlanPackageDto.package_id}`;
      return message;
    }

    // get workout plan with workout_plan_id in dto and make sure it's exist
    const workoutPlan = await connection.manager.findOne(WorkoutPlan, {
      where: { id: workoutPlanPackageDto.workout_plan_id },
    });

    if (!workoutPlan) {
      message = `Workout Plan with id ${workoutPlanPackageDto.workout_plan_id} not found`;
      return message;
    }

    if (workoutPlan.user.id !== user.id) {
      message = `You are not authorized to add workout plan with id ${workoutPlanPackageDto.workout_plan_id} to package`;
      return message;
    }

    // create user package workout plan
    const userPackageWorkoutPlan = connection.manager.create(
      UserPackageWorkoutPlan,
      {
        user: trainee,
        workoutPlan,
        coachPackage,
      },
    );

    await connection.manager.save(userPackageWorkoutPlan);

    message = 'Workout Plan added to package successfully';
    return message;
  }

  async deleteWorkoutPlanfromPackage(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
      },
    );

    if (!userPackageWorkoutPlan) {
      message = `Workout Plan with id ${id} not found in user's packages`;
      return message;
    }

    if ((await userPackageWorkoutPlan.package.coach.user).id !== user.id) {
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
        relations: ['workoutPlan'],
      },
    );

    return userPackageWorkoutPlans;
  }

  async getWorkoutPlanInPackage(id: number, user: User) {
    // get connection
    const connection = await ConnectionManager.getConnection();

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
        relations: ['workoutPlan'],
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
    user: User,
  ) {
    // get connection
    const connection = await ConnectionManager.getConnection();

    // find user package workout plan with this id
    const userPackageWorkoutPlan = await connection.manager.findOne(
      UserPackageWorkoutPlan,
      {
        where: { id },
      },
    );

    // if user package workout plan not found, throw exception
    if (!userPackageWorkoutPlan) {
      return `Workout Plan with id ${id} not found in user's packages`;
    }

    if ((await userPackageWorkoutPlan.package.coach.user).id !== user.id) {
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

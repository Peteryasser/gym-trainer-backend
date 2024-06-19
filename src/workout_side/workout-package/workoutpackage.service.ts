import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';
import { User } from 'src/entity/user.entity';
import { ConnectionManager } from 'src/config/connection_manager';
import { WorkoutPlanPackageDTO } from './dtos/workout_package_dto';
import { Package } from 'src/entity/coach-package.entity';
import { WorkoutPlan } from 'src/entity/workout-plan';
import { UserPackageWorkoutPlan } from 'src/entity/user-package-workoutPlan';

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
}

import {
  Controller,
  Body,
  Post,
  Delete,
  Param,
  Get,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { WorkoutPlanPackageService } from './workoutpackage.service';
import { WorkoutPlanPackageDTO } from './dtos/workout_package_dto';
import { WorkoutPlanPackageUpdateDTO } from './dtos/workout_package_update';
import { Coach } from '../../entity/coach.entity';
import { WorkoutSideUtils } from '../workoutSide.utils';

@Controller('workoutplan-package')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanPackageController {
  constructor(
    private readonly workoutPlanPackageService: WorkoutPlanPackageService,
  ) {}

  @Post('add')
  addWorkoutPlanToPackage(
    @Body() workoutPlanPackageDto: WorkoutPlanPackageDTO,
    @GetUser() user: Coach,
  ) {
    console.log('Add Workout Plan to Package ');
    console.log('workoutPlanPackageDto', workoutPlanPackageDto);

    return this.workoutPlanPackageService.addWorkoutPlanToPackage(
      workoutPlanPackageDto,
      user,
    );
  }

  @Delete('delete/:id')
  async deleteWorkoutPlan(@Param('id') id: number, @GetUser() user: Coach) {
    console.log('delete Workout Plan');
    return this.workoutPlanPackageService.deleteWorkoutPlanfromPackage(
      id,
      user,
    );
  }

  @Patch('update/:id')
  async updateWorkoutPlanInPackage(
    @Param('id') id: number,
    @Body() workoutPackageUpdateDTO: WorkoutPlanPackageUpdateDTO,
    @GetUser() user: Coach,
  ) {
    console.log('updateWorkoutPlanInPackage');
    return this.workoutPlanPackageService.updateWorkoutPlanInPackage(
      id,
      workoutPackageUpdateDTO,
      user,
    );
  }

  @Get('get-plans-by-id/:user_id')
  getPlan(@Param('user_id') userId: number, @GetUser() coach: Coach) {
    console.log('Get plan of one user and one coach');

    return this.workoutPlanPackageService.getPlanofUserByCoach(userId, coach);
  }

  @Get('get-my-workout-plans-in-packages')
  async getMyWorkoutPlansInPackage(@GetUser() user: User | Coach) {
    console.log('getMyWorkoutPlansInPackage');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutPlanPackageService.getMyWorkoutPlansInPackage(getUser);
  }





  // @Get('get-workout-plan-in-package/:id')
  // async getWorkoutPlanInPackage(@Param('id') id: number) {
  //   console.log('getWorkoutPlanInPackage');
  //   return this.workoutPlanPackageService.getWorkoutPlanInPackage(id);
  // }

  // @Get('get-plan-by-ids/:coach_id')
  // getUserPlan(@Param('coach_id') coachId: number, @GetUser() user: User) {
  //   console.log('Get plan of one user and one coach');

  //   return this.workoutPlanPackageService.getPlanUser(coachId, user);
  // }
}

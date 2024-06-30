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

@Controller('workoutplan-package')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanPackageController {
  constructor(
    private readonly workoutPlanPackageService: WorkoutPlanPackageService,
  ) {}

  @Post('add')
  addWorkoutPlanToPackage(
    @Body() workoutPlanPackageDto: WorkoutPlanPackageDTO,
    @GetUser() user: User,
  ) {
    console.log('Add Workout Plan to Package ');
    console.log('workoutPlanPackageDto', workoutPlanPackageDto);

    return this.workoutPlanPackageService.addWorkoutPlanToPackage(
      workoutPlanPackageDto,
      user,
    );
  }

  @Delete('delete/:id')
  async deleteWorkoutPlan(@Param('id') id: number, @GetUser() user: User) {
    console.log('delete Workout Plan');
    return this.workoutPlanPackageService.deleteWorkoutPlanfromPackage(
      id,
      user,
    );
  }

  @Get('get-my-workout-plans-in-package')
  async getMyWorkoutPlansInPackage(@GetUser() user: User) {
    console.log('getMyWorkoutPlansInPackage');
    return this.workoutPlanPackageService.getMyWorkoutPlansInPackage(user);
  }

  @Get('get-workout-plan-in-package/:id')
  async getWorkoutPlanInPackage(@Param('id') id: number) {
    console.log('getWorkoutPlanInPackage');
    return this.workoutPlanPackageService.getWorkoutPlanInPackage(id);
  }

  @Get('get-plan-by-ids/:user_id')
  getPlan(@Param('user_id') userId: number, @GetUser() coach: Coach) {
    console.log('Get plan of one user and one coach');

    return this.workoutPlanPackageService.getPlan(userId, coach);
  }

  @Get('get-plan-by-ids/:coach_id')
  getUserPlan(@Param('coach_id') coachId: number, @GetUser() user: User) {
    console.log('Get plan of one user and one coach');

    return this.workoutPlanPackageService.getPlanUser(coachId, user);
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
}

import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { WorkoutPlanService } from './workoutplan.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { WorkoutPlanUpdateDto } from './dtos/workout_plan_update_dto';
import { WorkoutPlan } from '../../entity/workout-plan.entity';
import { WorkoutSideUtils } from '../workoutSide.utils';

@Controller('workout-plan')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @Post('create')
  async createWorkoutPlan(
    @Body() workoutPlanDto,
    @GetUser() user: User | Coach,
  ) {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('Create Workout Plan ');
    console.log('workoutPlanDto', workoutPlanDto);

    return this.workoutPlanService.createWorkoutPlan(workoutPlanDto, getUser);
  }

  @Delete('delete/:id')
  async deleteWorkoutPlan(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ) {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('Delete Workout Plan ');
    console.log('id', id);

    return this.workoutPlanService.deleteWorkoutPlan(id, getUser);
  }

  @Get('get-my-plans')
  async getMyPlans(@GetUser() user: User | Coach): Promise<WorkoutPlan[]> {
    console.log('Get My Plans ');
    const getUser = await WorkoutSideUtils.getTheUser(user);

    return this.workoutPlanService.getMyPlans(getUser);
  }

  @Patch('update/:id')
  async updateWorkoutPlan(
    @Param('id') id: number,
    @Body() workoutPlanUpdateDto: WorkoutPlanUpdateDto,
    @GetUser() user: User | Coach,
  ) {
    console.log('Update Workout Plan ');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutPlanService.updateWorkoutPlan(
      id,
      workoutPlanUpdateDto,
      getUser,
    );
  }
}

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
import { WorkoutPlanUpdateDto } from './dtos/workout_plan_update_dto';
import { WorkoutPlan } from '../../entity/workout-plan.entity';

@Controller('workout-plan')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanController {
  constructor(private readonly workoutPlanService: WorkoutPlanService) {}

  @Post('create')
  createWorkoutPlan(@Body() workoutPlanDto, @GetUser() user: User) {
    console.log('Create Workout Plan ');
    console.log('workoutPlanDto', workoutPlanDto);

    return this.workoutPlanService.createWorkoutPlan(workoutPlanDto, user);
  }

  @Delete('delete/:id')
  deleteWorkoutPlan(@Param('id') id: number, @GetUser() user: User) {
    console.log('Delete Workout Plan ');
    console.log('id', id);

    return this.workoutPlanService.deleteWorkoutPlan(id, user);
  }

  @Get('get-my-plans')
  getMyPlans(@GetUser() user: User): Promise<WorkoutPlan[]> {
    console.log('Get My Plans ');

    return this.workoutPlanService.getMyPlans(user);
  }

  @Patch('update/:id')
  updateWorkoutPlan(
    @Param('id') id: number,
    @Body() workoutPlanUpdateDto: WorkoutPlanUpdateDto,
    @GetUser() user: User,
  ) {
    console.log('Update Workout Plan ');

    return this.workoutPlanService.updateWorkoutPlan(
      id,
      workoutPlanUpdateDto,
      user,
    );
  }
}

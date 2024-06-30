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
import { WorkoutService } from './workout.service';
import { WorkoutDto } from './dtos/workout.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { Workout } from '../../entity/workout.entity';
import { WorkoutUpdateDto } from './dtos/workout.update.dto';
import { WorkoutSideUtils } from '../workoutSide.utils';
import { Coach } from 'src/entity/coach.entity';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('create')
  async createWorkout(
    @Body() createWorkoutDto: WorkoutDto,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('createWorkout');
    console.log('createWorkoutDto', createWorkoutDto);
    console.log('user', user);

    return this.workoutService.createWorkout(getUser, createWorkoutDto);
  }

  @Get('my-workouts-detailed')
  async getMyWorkouts(@GetUser() user: User | Coach): Promise<Workout[]> {
    console.log('getMyWorkouts');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutService.getMyWorkouts(getUser);
  }

  @Get('my-workouts-summary')
  async getMyWorkoutsSummary(
    @GetUser() user: User | Coach,
  ): Promise<Workout[]> {
    console.log('getMyWorkoutsSummary');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutService.getMyWorkoutsSummary(getUser);
  }

  @Delete('delete/:id')
  async deleteExercise(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('delete Workout');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutService.deleteWorkout(getUser, id);
    // return { message: 'Workout deleted successfully' };
  }

  @Patch('update/:id')
  async updateWorkout(
    @GetUser() user: User | Coach,
    @Param('id') id: number,
    @Body() updatedto: WorkoutUpdateDto,
  ): Promise<string> {
    console.log('updateWorkout');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workoutService.update(getUser, id, updatedto);
  }
}

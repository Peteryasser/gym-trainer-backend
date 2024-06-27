import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutDto } from './dtos/workout.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { Workout } from 'src/entity/workout.entity';
import { WorkoutUpdateDto } from './dtos/workout.update.dto';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post('create')
  async createWorkout(
    @Body() createWorkoutDto: WorkoutDto,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('createWorkout');
    console.log('createWorkoutDto', createWorkoutDto);
    console.log('user', user);

    return this.workoutService.createWorkout(user, createWorkoutDto);
  }

  @Get('my-workouts-detailed')
  async getMyWorkouts(@GetUser() user: User): Promise<Workout[]> {
    console.log('getMyWorkouts');
    return this.workoutService.getMyWorkouts(user);
  }

  @Get('my-workouts-summary')
  async getMyWorkoutsSummary(@GetUser() user: User): Promise<Workout[]> {
    console.log('getMyWorkoutsSummary');
    return this.workoutService.getMyWorkoutsSummary(user);
  }

  @Delete('delete/:id')
  async deleteExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('delete Workout');
    return this.workoutService.deleteWorkout(user, id);
    // return { message: 'Workout deleted successfully' };
  }

  @Patch('update/:id')
  async updateWorkout(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updatedto: WorkoutUpdateDto,
  ): Promise<String> {
    console.log('updateWorkout');
    return this.workoutService.update(user, id, updatedto);
  }
}

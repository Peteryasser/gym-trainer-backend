import { Controller, Get, Body, Post, Delete, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutDto } from './dtos/workout.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { Workout } from 'src/entity/workout.entity';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  // @Get('test')
  // async test(): Promise<string> {
  //   return 'WorkoutController test';
  // }

  @Post('create')
  async createWorkout(
    @Body() createWorkoutDto: WorkoutDto,
    @GetUser() user: User,
  ): Promise<Workout> {
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
  ): Promise<{ message: string }> {
    console.log('delete Workout');
    this.workoutService.deleteWorkout(user, id);
    return { message: 'Workout deleted successfully' };
  }
}

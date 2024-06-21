import {
  Controller,
  Post,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { SaveService } from './save.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post('save/exercise/:id')
  async saveExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveExercise');
    this.saveService.saveExercise(id, user);
    return { message: 'Exercise saved successfully' };
  }

  @Delete('unsave/exercise/:id')
  async unsaveExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveExercise');
    this.saveService.unsaveExercise(id, user);
    return { message: 'Exercise unsaved successfully' };
  }

  @Get('get/exercises')
  async getSavedExercises(@GetUser() user: User) {
    console.log('getSavedExercises');
    return this.saveService.getSavedExercises(user);
  }

  @Post('save/workout/:id')
  async saveWorkout(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveWorkout');
    this.saveService.saveWorkout(id, user);
    return { message: 'Workout saved successfully' };
  }

  @Delete('unsave/workout/:id')
  async unsaveWorkout(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveWorkout');
    this.saveService.unsaveWorkout(id, user);
    return { message: 'Workout unsaved successfully' };
  }

  @Get('get/workouts')
  async getSavedWorkouts(@GetUser() user: User) {
    console.log('getSavedExercises');
    return this.saveService.getSavedWorkouts(user);
  }

  @Post('save/workoutCollection/:id')
  async saveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveWorkoutCollection');
    this.saveService.saveWorkoutCollection(id, user);
    return { message: 'Workout Collection saved successfully' };
  }

  @Delete('unsave/workoutCollection/:id')
  async unsaveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveWorkoutCollection');
    this.saveService.unsaveWorkoutCollection(id, user);
    return { message: 'Workout Collection unsaved successfully' };
  }

  @Get('get/workoutCollections')
  async getSavedWorkoutCollections(@GetUser() user: User) {
    console.log('getSavedWorkoutCollections');
    return this.saveService.getSavedWorkoutCollections(user);
  }
}

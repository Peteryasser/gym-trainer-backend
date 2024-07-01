import {
  Controller,
  Post,
  UseGuards,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { SaveService } from './save.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { WorkoutSideUtils } from '../workoutSide.utils';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post('save/exercise/:id')
  async saveExercise(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('saveExercise');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.saveExercise(id, getUser);
  }

  @Delete('unsave/exercise/:id')
  async unsaveExercise(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('unsaveExercise');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.unsaveExercise(id, getUser);
    // return { message: 'Exercise unsaved successfully' };
  }

  @Get('get/exercises')
  async getSavedExercises(@GetUser() user: User | Coach) {
    console.log('getSavedExercises');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.getSavedExercises(getUser);
  }

  @Post('save/workout/:id')
  async saveWorkout(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('saveWorkout');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.saveWorkout(id, getUser);
  }

  @Delete('unsave/workout/:id')
  async unsaveWorkout(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('unsaveWorkout');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.unsaveWorkout(id, getUser);
  }

  @Get('get/workouts')
  async getSavedWorkouts(@GetUser() user: User | Coach) {
    console.log('getSavedExercises');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.getSavedWorkouts(getUser);
  }

  @Post('save/workoutCollection/:id')
  async saveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('saveWorkoutCollection');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.saveWorkoutCollection(id, getUser);
  }

  @Delete('unsave/workoutCollection/:id')
  async unsaveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('unsaveWorkoutCollection');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.unsaveWorkoutCollection(id, getUser);
  }

  @Get('get/workoutCollections')
  async getSavedWorkoutCollections(@GetUser() user: User | Coach) {
    console.log('getSavedWorkoutCollections');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.saveService.getSavedWorkoutCollections(getUser);
  }
}

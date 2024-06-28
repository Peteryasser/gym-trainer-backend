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
  ): Promise<String> {
    console.log('saveExercise');
    return this.saveService.saveExercise(id, user);
  }

  @Delete('unsave/exercise/:id')
  async unsaveExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('unsaveExercise');
    return this.saveService.unsaveExercise(id, user);
    // return { message: 'Exercise unsaved successfully' };
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
  ): Promise<String> {
    console.log('saveWorkout');
    return this.saveService.saveWorkout(id, user);
  }

  @Delete('unsave/workout/:id')
  async unsaveWorkout(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('unsaveWorkout');
    return this.saveService.unsaveWorkout(id, user);
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
  ): Promise<String> {
    console.log('saveWorkoutCollection');
    return this.saveService.saveWorkoutCollection(id, user);
  }

  @Delete('unsave/workoutCollection/:id')
  async unsaveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('unsaveWorkoutCollection');
    return this.saveService.unsaveWorkoutCollection(id, user);
  }

  @Get('get/workoutCollections')
  async getSavedWorkoutCollections(@GetUser() user: User) {
    console.log('getSavedWorkoutCollections');
    return this.saveService.getSavedWorkoutCollections(user);
  }
}

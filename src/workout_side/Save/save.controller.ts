import { Controller, Post, UseGuards, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { SaveService } from './save.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('save')
@Controller('unsave')
@UseGuards(JwtAuthGuard)
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post('exercise/:id')
  async saveExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveExercise');
    this.saveService.saveExercise(id, user);
    return { message: 'Exercise saved successfully' };
  }

  @Delete('exercise/:id')
  async unsaveExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveExercise');
    this.saveService.unsaveExercise(id, user);
    return { message: 'Exercise unsaved successfully' };
  }

  @Post('workout/:id')
  async saveWorkout(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveWorkout');
    this.saveService.saveWorkout(id, user);
    return { message: 'Workout saved successfully' };
  }

  @Delete('workout/:id')
  async unsaveWorkout(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveWorkout');
    this.saveService.unsaveWorkout(id, user);
    return { message: 'Workout unsaved successfully' };
  }

  @Post('workoutCollection/:id')
  async saveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('saveWorkoutCollection');
    this.saveService.saveWorkoutCollection(id, user);
    return { message: 'Workout Collection saved successfully' };
  }

  @Delete('workoutCollection/:id')
  async unsaveWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('unsaveWorkoutCollection');
    this.saveService.unsaveWorkoutCollection(id, user);
    return { message: 'Workout Collection unsaved successfully' };
  }
}

import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/entity/exercise.entity';

@Controller('exercises')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('first')
  async getFirstExercise(): Promise<Exercise> {
    console.log('getFirstExercise');
    return this.exerciseService.getBackExercises();
  }
}

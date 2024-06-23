import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { ExerciseFilterService } from './filter.service';
import { Exercise } from 'src/entity/exercise.entity';
import { FilterExercisesDto } from './dtos/filter-exercise-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('exercises-filter')
@UseGuards(JwtAuthGuard)
export class ExerciseFilterController {
  constructor(private readonly exerciseService: ExerciseFilterService) {}

  @Get()
  findAll(
    @Body() filters: FilterExercisesDto,
    @GetUser() user: User,
  ): Promise<Exercise[]> {
    console.log('filters', filters);
    return this.exerciseService.getFilteredExercises(filters, user);
  }
}

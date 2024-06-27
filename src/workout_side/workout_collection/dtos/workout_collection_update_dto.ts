import { IsArray, IsOptional, IsString } from 'class-validator';
import { WorkoutDto } from 'src/workout_side/workout/dtos/workout.dto';

export class WorkoutCollectionUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  workouts: WorkoutDto[];
}

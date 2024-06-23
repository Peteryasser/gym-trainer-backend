import { IsArray, IsOptional, IsString } from 'class-validator';

export class WorkoutCollectionUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  workout_ids?: number[];
}

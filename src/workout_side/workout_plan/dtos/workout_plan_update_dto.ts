import { IsArray, IsDate, IsOptional, IsString } from 'class-validator';

export class WorkoutPlanUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsArray()
  workout_collection_ids: number[];
}

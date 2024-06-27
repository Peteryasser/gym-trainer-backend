import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class WorkoutUpdateDto {
  @IsOptional()
  @IsNumber()
  exerciseId: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  setsNumber: number;

  @IsOptional()
  @IsArray()
  repsNumber: number[];

  @IsOptional()
  @IsArray()
  weights: number[];

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  durationUnit: string;
}

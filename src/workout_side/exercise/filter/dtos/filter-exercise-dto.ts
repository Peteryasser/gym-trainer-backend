import { IsArray, IsOptional, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterExercisesDto {
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  bodyPartIds?: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  equipmentIds?: number[];

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  muscleIds?: number[];
}

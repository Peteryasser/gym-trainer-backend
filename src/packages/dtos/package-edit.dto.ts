import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { DurationUnitEnum } from '../duration-unit.enum';

export class PackageEditDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsOptional()
  @IsEnum(DurationUnitEnum)
  @IsNotEmpty()
  durationUnit: DurationUnitEnum;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  hasNutrition: boolean;
}

import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { DurationUnitEnum } from '../duration-unit.enum';

export class PackageDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsEnum(DurationUnitEnum)
  @IsNotEmpty()
  durationUnit: DurationUnitEnum;

  @IsOptional()
  @IsString()
  description: string;

  @IsBoolean()
  hasNutrition: boolean;
}

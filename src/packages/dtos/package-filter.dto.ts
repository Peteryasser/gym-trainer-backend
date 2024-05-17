// package-filter.dto.ts
import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { DurationUnitEnum } from 'src/packages/duration-unit.enum';

export class PackageFilterDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  keyword?: string;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  minDuration?: number;

  @IsOptional()
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsEnum(DurationUnitEnum)
  durationUnit?: DurationUnitEnum;
}

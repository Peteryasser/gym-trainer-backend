// package-filter.dto.ts
import { IsOptional, IsEnum, IsNumberString } from 'class-validator';
import { DurationUnitEnum } from 'src/packages/duration-unit.enum';

export class PackageFilterDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  keyword?: string;

  @IsOptional()
  @IsNumberString()
  minPrice?: number;

  @IsOptional()
  @IsNumberString()
  maxPrice?: number;

  @IsOptional()
  @IsNumberString()
  minDuration?: number;

  @IsOptional()
  @IsNumberString()
  maxDuration?: number;

  @IsOptional()
  @IsEnum(DurationUnitEnum)
  durationUnit?: DurationUnitEnum;
}

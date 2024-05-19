// package-filter.dto.ts
import { IsOptional, IsEnum, IsNumberString } from 'class-validator';
import { DurationUnitEnum } from '../../packages/duration-unit.enum';
import { PaginationDto } from '../../dtos/pagination.dto';

export class PackageFilterDto extends PaginationDto {
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

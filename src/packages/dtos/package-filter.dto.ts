import { IsOptional, IsEnum } from 'class-validator';
import { DurationUnitEnum } from '../../packages/duration-unit.enum';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Transform } from 'class-transformer';

export class PackageFilterDto extends PaginationDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  keyword?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  minPrice?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  maxPrice?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  minDuration?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  maxDuration?: number;

  @IsOptional()
  @IsEnum(DurationUnitEnum)
  durationUnit?: DurationUnitEnum;
}

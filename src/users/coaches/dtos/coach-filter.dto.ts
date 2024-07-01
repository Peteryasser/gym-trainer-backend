import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../dtos/pagination.dto';

export class CoachFilterDto extends PaginationDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  keyword?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  minRating?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  maxRating?: number;
}

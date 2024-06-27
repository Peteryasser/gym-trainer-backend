import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Transform } from 'class-transformer';

export class ReviewFilterDto extends PaginationDto {
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

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  userId?: number;
}

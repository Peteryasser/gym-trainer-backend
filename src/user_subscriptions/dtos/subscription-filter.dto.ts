import { IsOptional } from 'class-validator';
import { PaginationDto } from '../../dtos/pagination.dto';
import { Transform } from 'class-transformer';

export class SubscriptionFilterDto extends PaginationDto {
  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  coachId?: number;

  @IsOptional()
  @Transform(({ value }) => value === 'true')
  active?: boolean;
}

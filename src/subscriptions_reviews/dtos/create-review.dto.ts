import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  subscriptionId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @IsOptional()
  @IsString()
  comment: string;
}

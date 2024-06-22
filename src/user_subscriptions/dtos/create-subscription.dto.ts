import { Transform } from 'class-transformer';
import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  packageId: number;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value || new Date().toISOString(), {
    toClassOnly: true,
  })
  startDate: string;
}

import { IsNumber, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateMeasurementDto {
  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  bodyFat?: number;

  @IsNumber()
  @IsOptional()
  weightGoal?: number;

  @IsNumber()
  @IsOptional()
  waist?: number;

  @IsNumber()
  @IsOptional()
  neck?: number;

  @IsNumber()
  @IsOptional()
  shoulders?: number;

  @IsNumber()
  @IsOptional()
  chest?: number;

  @IsNumber()
  @IsOptional()
  arm?: number;

  @IsNumber()
  @IsOptional()
  forearm?: number;

  @IsNumber()
  @IsOptional()
  wrist?: number;

  @IsNumber()
  @IsOptional()
  hips?: number;

  @IsNumber()
  @IsOptional()
  thighs?: number;

  @IsNumber()
  @IsOptional()
  calf?: number;
}
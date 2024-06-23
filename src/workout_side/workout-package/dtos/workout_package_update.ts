import { IsNumber, IsOptional } from 'class-validator';

export class WorkoutPlanPackageUpdateDTO {
  @IsOptional()
  @IsNumber()
  workout_plan_id: number;
}

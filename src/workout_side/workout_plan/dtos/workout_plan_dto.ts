export class WorkoutPlanDto {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  workout_collection_ids: number[];
}

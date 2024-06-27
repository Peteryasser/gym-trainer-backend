export class WorkoutDto {
  exerciseId: number;
  description: string;
  setsNumber: number;
  repsNumber: number[];
  weights: number[];
  duration: number;
  durationUnit: string;
}

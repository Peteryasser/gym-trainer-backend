import { WorkoutDto } from '../../workout/dtos/workout.dto';

export class WorkoutCollectionDto {
  name: string;
  description: string;
  workouts: WorkoutDto[];
}

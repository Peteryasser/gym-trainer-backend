import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';
import { WorkoutExerciseDetails } from './workout-exercise-details.entity';

@Entity({ name: 'workout_exercises' })
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => WorkoutExerciseDetails,
    (workoutExerciseDetails) => workoutExerciseDetails.workoutExercise,
    { cascade: true },
  )
  workoutExerciseDetails: WorkoutExerciseDetails[];

  @ManyToOne(() => Workout, (workout) => workout.workoutExercises, {
    nullable: false,
  })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutExercises, {
    nullable: false,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;
}

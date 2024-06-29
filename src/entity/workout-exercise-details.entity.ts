import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity({ name: 'workout_exercise_details' })
export class WorkoutExerciseDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workoutExerciseDetails,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'workout_exercise_id' })
  workoutExercise: WorkoutExercise;

  @Column({ type: 'int' })
  sets: number;

  @Column('float', { array: true, default: [] })
  weights: number[];

  @Column('int', { array: true, default: [] })
  reps: number[];

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 10 })
  durationUnit: string;
}

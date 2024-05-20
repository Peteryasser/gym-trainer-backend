import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutExercise } from './workout-exercise';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'workout_exercise_details' })
export class WorkoutExerciseDetails {
  @PrimaryGeneratedColumn()
  id: number;

//   @ManyToOne(() => Workout, workout => workout.workoutExerciseDetails, { nullable: false })
//   @JoinColumn({ name: 'workout_id' })
//   workout: Workout;

//   @ManyToOne(() => Exercise, exercise => exercise.workoutExerciseDetails, { nullable: false })
//   @JoinColumn({ name: 'exercise_id' })
//   exercise: Exercise;

    @ManyToOne(() => WorkoutExercise, workoutExercise => workoutExercise.id, { nullable: false })
    @JoinColumn({ name: 'workout_exercise_id' })
    workoutExercise: WorkoutExercise;

  @Column({ type: 'int' })
  sets: number;

  @Column({ type: 'int' })
  reps: number;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 10 })
  durationUnit: string;
}

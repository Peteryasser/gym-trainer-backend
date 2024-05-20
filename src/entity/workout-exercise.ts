import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'workout_exercises' })
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workout, workout => workout.id, { nullable: false })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @ManyToOne(() => Exercise, exercise => exercise.id, { nullable: false })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;
}

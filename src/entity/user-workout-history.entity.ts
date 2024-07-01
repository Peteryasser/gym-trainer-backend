import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Workout } from './workout.entity';

@Entity({ name: 'workout_history' }) // Updated table name
export class WorkoutHistory {
  // Updated entity name
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workoutHistories, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workout, (workout) => workout.userHistory, {
    nullable: false,
  })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout; // Updated relationship

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'int' })
  numberOfSets: number; // New column

  @Column('int', { array: true })
  weights: number[]; // New column

  @Column('int', { array: true })
  reps: number[]; // New column

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 10 })
  durationUnit: string;
}

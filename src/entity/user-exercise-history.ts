import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'user_exercise_history' })
export class UserExerciseHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.exerciseHistory, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Exercise, exercise => exercise.userHistory, { nullable: false })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @Column({ type: 'timestamp' })
  date: Date;
}

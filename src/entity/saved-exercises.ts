import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Exercise } from './exercise.entity';

@Entity({ name: 'save_exercise' })
export class SavedExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.savedExercises, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.savedExercises, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;
}

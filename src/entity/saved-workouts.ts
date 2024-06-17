import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Workout } from './workout.entity';

@Entity({ name: 'saved_workouts' })
export class SavedWorkout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.savedWorkouts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Workout, (workout) => workout.savedWorkouts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;
}

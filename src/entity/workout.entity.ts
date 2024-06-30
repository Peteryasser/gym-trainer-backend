import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { SavedWorkout } from './saved-workouts.entity';
// import { WorkoutPlanDetails } from './workout-plan-details';
import { WorkoutExercise } from './workout-exercise.entity';
import { WorkoutHistory } from './user-workout-history.entity';
import { WorkoutCollectionDetails } from './workout-collection-details.entity';

@Entity({ name: 'workouts' })
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  type: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.workouts, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.workout,
    {
      cascade: true,
    },
  )
  workoutExercises: WorkoutExercise[];

  @OneToMany(() => WorkoutHistory, (history) => history.workout)
  userHistory: WorkoutHistory[]; // New relationship

  @OneToMany(() => SavedWorkout, (savedWorkout) => savedWorkout.workout, {
    cascade: true,
  })
  savedWorkouts: SavedWorkout[];

  @OneToMany(() => WorkoutCollectionDetails, (details) => details.workout)
  workoutCollectionDetails: WorkoutCollectionDetails[];
}

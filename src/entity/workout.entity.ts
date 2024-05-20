import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';

import { SavedWorkout } from './saved-workouts';
import { WorkoutPlanDetails } from './workout-plan-details';


@Entity({ name: 'workouts' })
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bit' })
  type: boolean;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => WorkoutPlanDetails, workoutPlanDetails => workoutPlanDetails.workout, { cascade: true })
  workoutPlanDetails: WorkoutPlanDetails[];

  @OneToMany(()=> SavedWorkout, savedWorkout => savedWorkout.workout, { cascade: true })
  savedWorkouts: SavedWorkout[];

}

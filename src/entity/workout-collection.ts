import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutCollectionDetails } from './workout-collection-details';
import { WorkoutPlanDetails } from './workout-plan-details';
import { SavedWorkoutCollection } from './saved-workout-collection';

@Entity({ name: 'workout_collections' })
export class WorkoutCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false })
  type: boolean;

  @ManyToOne(() => User, (user) => user.workoutCollections, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => WorkoutCollectionDetails,
    (details) => details.workoutCollection,
    { cascade: true },
  )
  workoutCollectionDetails: WorkoutCollectionDetails[];

  // @OneToMany(
  //   () => WorkoutPlanDetails,
  //   (workoutPlanDetails) => workoutPlanDetails.workout,
  //   { cascade: true },
  // )
  // workoutPlanDetails: WorkoutPlanDetails[];

  @OneToMany(
    () => WorkoutPlanDetails,
    (workoutPlanDetails) => workoutPlanDetails.workoutCollection,
    { cascade: true },
  )
  workoutPlanDetails: WorkoutPlanDetails[];

  @OneToMany(
    () => SavedWorkoutCollection,
    (savedWorkoutCollection) => savedWorkoutCollection.workoutCollection,
    {
      cascade: true,
    },
  )
  savedWorkoutCollections: SavedWorkoutCollection[];
}

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutCollection } from './workout-collection.entity';
import { Workout } from './workout.entity';

@Entity({ name: 'workout_collection_details' })
export class WorkoutCollectionDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => WorkoutCollection,
    (collection) => collection.workoutCollectionDetails,
    { nullable: false },
  )
  @JoinColumn({ name: 'workout_collection_id' })
  workoutCollection: WorkoutCollection;

  @ManyToOne(() => Workout, (workout) => workout.workoutCollectionDetails, {
    nullable: false,
  })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;
}

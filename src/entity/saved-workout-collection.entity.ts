import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkoutCollection } from './workout-collection.entity';

@Entity({ name: 'save_workout_collection' })
export class SavedWorkoutCollection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.savedWorkoutCollections, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => WorkoutCollection,
    (workoutCollection) => workoutCollection.savedWorkoutCollections,
    {
      nullable: false,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'workout_collection_id' })
  workoutCollection: WorkoutCollection;
}

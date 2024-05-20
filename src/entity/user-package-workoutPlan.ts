import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { WorkoutPlan } from './workout-plan';
import { Package } from './coach-package.entity';

@Entity({ name: 'user_package_workout_plan' })
export class UserPackageWorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userPackageWorkoutPlans, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.userPackageWorkoutPlans, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutplan_id' })
  workoutPlan: WorkoutPlan;

  @ManyToOne(() => Package, packageEntity => packageEntity.userPackageWorkoutPlans, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'package_id' })
  package: Package;
}

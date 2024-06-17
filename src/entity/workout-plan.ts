import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { WorkoutPlanDetails } from './workout-plan-details';
import { UserPackageWorkoutPlan } from './user-package-workoutPlan';

@Entity({ name: 'workout_plans' })
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'date' })
  startTime: Date;

  @Column({ type: 'date' })
  endTime: Date;

  @ManyToOne(() => User, (user) => user.workoutPlans, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => WorkoutPlanDetails,
    (workoutPlanDetails) => workoutPlanDetails.workoutPlan,
    { cascade: true },
  )
  workoutPlanDetails: WorkoutPlanDetails[];

  @OneToMany(
    () => UserPackageWorkoutPlan,
    (userPackageWorkoutPlan) => userPackageWorkoutPlan.workoutPlan,
  )
  userPackageWorkoutPlans: UserPackageWorkoutPlan[];
}

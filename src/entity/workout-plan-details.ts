import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WorkoutPlan } from './workout-plan';
import { Workout } from './workout.entity';

@Entity({ name: 'workout_plan_details' })
export class WorkoutPlanDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workoutPlanDetails, { nullable: false })
  @JoinColumn({ name: 'workout_plan_id' })
  workoutPlan: WorkoutPlan;

  @ManyToOne(() => Workout, workout => workout.workoutPlanDetails, { nullable: false })
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Device } from './device.entity';
import { Coach } from './coach.entity';
import { Workout } from './workout.entity';
import { UserExerciseHistory } from './user-exercise-history';
import { WorkoutPlan } from './workout-plan';
import { SavedWorkout } from './saved-workouts';
import { UserPackageWorkoutPlan } from './user-package-workoutPlan';
import { Exercise } from './exercise.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 255, nullable: true })
  profilePictureUrl: string;

  @Column({ length: 10, default: '+20' })
  countryCode: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ length: 6, nullable: true, default: null })
  verificationToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  verificationTokenSentAt: Date;

  @Column({ length: 6, nullable: true, default: null })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  resetPasswordTokenSentAt: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isSocialAccount: boolean;

  @Column({ default: true })
  enableNotifications: boolean;

  @Column({ length: 10, default: 'en' })
  defaultLocale: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToOne(() => Coach, (coach) => coach.user, { cascade: true, eager: true })
  coach: Coach;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @OneToMany(() => Workout, workout => workout.user)
  workouts: Workout[];

  @OneToMany(() => UserExerciseHistory, history => history.user)
  exerciseHistory: UserExerciseHistory[];

  @OneToMany(() => WorkoutPlan, workoutPlan => workoutPlan.user)
  workoutPlans: WorkoutPlan[];

  @OneToMany(() => SavedWorkout, savedWorkout => savedWorkout.user)
  savedWorkouts: SavedWorkout[];

  @OneToMany(() => UserPackageWorkoutPlan, userPackageWorkoutPlan => userPackageWorkoutPlan.user)
  userPackageWorkoutPlans: UserPackageWorkoutPlan[];
}

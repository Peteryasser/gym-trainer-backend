// Exercise Entity
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Unique,
} from 'typeorm';
import { BodyPart } from './bodyPart.entity';
import { Muscle } from './muscle.entity';
import { Instruction } from './instruction.entity';
import { Equipment } from './equipment.entity';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-exercise.entity';
import { SavedExercise } from './saved-exercises.entity';

@Entity({ name: 'exercises' }) // Specify the table name (optional)
@Unique(['idApi'])
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  idApi: string;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.exercises, {
    cascade: true,
  })
  @JoinColumn()
  bodyPart: BodyPart;

  @Column({ type: 'varchar', length: 255 })
  gifUrl: string;

  @ManyToOne(() => Muscle, (muscle) => muscle.mainFocusExercises, {
    cascade: true,
  })
  @JoinColumn()
  targetMuscle: Muscle;

  @ManyToMany(() => Muscle, (muscle) => muscle.secondaryFocusExercises, {
    cascade: true,
  })
  @JoinTable()
  secondaryMuscles: Muscle[];

  @OneToMany(() => Instruction, (instruction) => instruction.exercise, {
    cascade: ['insert', 'update', 'remove'],
  })
  instructions: Instruction[];

  @ManyToMany(() => Equipment, (equipment) => equipment.exercises, {
    cascade: true,
  })
  @JoinTable()
  equipments: Equipment[];

  @ManyToOne(() => User, (user) => user.exercises, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'boolean', default: false })
  type: boolean;

  @OneToMany(() => SavedExercise, (savedExercise) => savedExercise.exercise, {
    cascade: true,
  })
  savedExercises: SavedExercise[];

  @Column({ type: 'int', default: 1, nullable: true })
  version: number;

  @OneToMany(
    () => WorkoutExercise,
    (workoutExercise) => workoutExercise.exercise,
  )
  workoutExercises: WorkoutExercise[];
}

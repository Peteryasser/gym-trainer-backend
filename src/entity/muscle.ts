// Muscle Entity
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity('Muscles') // Specify the table name (optional)
@Unique(['name'])
export class Muscle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @OneToMany(() => Exercise, (exercise) => exercise.targetMuscle)
  mainFocusExercises: Exercise[];

  @ManyToMany(() => Exercise, (exercise) => exercise.secondaryMuscles)
  secondaryFocusExercises: Exercise[];
}

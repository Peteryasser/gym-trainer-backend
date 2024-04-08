// Instruction Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Exercise, exercise => exercise.instructions)
  @JoinColumn({ name: 'exercise_id', referencedColumnName: 'id' })
  exercise: Exercise;
}

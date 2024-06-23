// Instruction Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ default: 0 })
  order: number;

  @ManyToOne(() => Exercise, exercise => exercise.instructions)
  @JoinColumn()
  exercise: Exercise;
}

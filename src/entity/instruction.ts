// Instruction.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Exercise } from './exercise';


@Entity()
export class Instruction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => Exercise, exercise => exercise.instructions)
  @JoinColumn({name:'exercise_id'})
  exercise: Exercise;
}

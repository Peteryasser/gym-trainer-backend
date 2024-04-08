// Exercise Entity
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Unique } from 'typeorm';
import { BodyPart } from './bodyPart';
import { Muscle } from './muscle';
import { Instruction } from './instruction';
import { Equipment } from './equipment';

@Entity({ name: 'exercises' }) // Specify the table name (optional)
@Unique(["idApi"])
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  idApi: string;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.exercises,{cascade:true})
  @JoinColumn()
  bodyPart: BodyPart;

  @Column({ type: 'varchar', length: 255 })
  gifUrl: string;

  @ManyToOne(() => Muscle, (muscle) => muscle.mainFocusExercises,{cascade:true})
  @JoinColumn()
  targetMuscle: Muscle;

  @ManyToMany(() => Muscle, (muscle) => muscle.secondaryFocusExercises,{cascade:true})
  @JoinTable()
  secondaryMuscles: Muscle[];

  @OneToMany(() => Instruction, instruction => instruction.exercise, { cascade: true })
  instructions: Instruction[];

  @ManyToMany(() => Equipment, (equipment) => equipment.exercises)
  @JoinTable()
  equipments: Equipment[];
}

// src/entities/exercise.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BodyPart } from './bodyPart';
import { Muscle } from './muscle';
import { Instruction } from './instruction';
import { Equipment} from './equipment';

@Entity('exercises') // Specify the table name (optional)
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  idApi: string;

  @ManyToOne(() => BodyPart, (bodyPart) => bodyPart.exercises)
  @JoinColumn()
  bodyPart: BodyPart;

  @Column({ type: 'varchar', length: 255 })
  gifUrl: string;

  @ManyToOne(()=>Muscle,(muscle)=>muscle.mainFocusExercises,{cascade:true})
  @JoinColumn()
  targetMuscle: Muscle;

  @ManyToMany(()=>Muscle,(muscle)=>muscle.mainFocusExercises,{cascade:true})
  @JoinTable()
  secondaryMuscles: Muscle[];

  @OneToMany(()=>Instruction,instruction => instruction.exercise, { cascade: true })
  instructions: Instruction[];


  @ManyToMany(()=>Equipment,(equipment)=>equipment.exercises ,{cascade:true})
  @JoinTable()
  equipments: Equipment[];
}


/*

import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity({name: 'User'})
@Unique(["email"])
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column("varchar", { length: 256 })
    name: string;

    @Column()
    password: string;

    @Column({ nullable: true }) // Nullable because OTP might not be set initially
    otp: string;

    @Column({ nullable: true, type: "timestamp" }) // Nullable because OTP expiration might not be set initially
    otpExpiration: Date;

}
*/
import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany } from 'typeorm';
import { Exercise } from './exercise';

@Entity('Equipments') // Specify the table name (optional)
@Unique(["name"])
export class Equipment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @ManyToMany(()=>Exercise,(exercise)=>exercise.equipments)
    exercises:Exercise[]

}


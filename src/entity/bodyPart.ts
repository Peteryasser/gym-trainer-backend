import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Exercise } from './exercise';

@Entity('Body_part') // Specify the table name (optional)
@Unique(["name"])
export class BodyPart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @OneToMany(() => Exercise, (exercise) => exercise.bodyPart)
    exercises:Exercise[]
}


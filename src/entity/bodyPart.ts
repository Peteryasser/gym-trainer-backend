// BodyPart Entity
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity('Body_parts') // Specify the table name (optional) - changed to lowercase and underscores for consistency
@Unique(["name"])
export class BodyPart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 45 })
    name: string;

    @OneToMany(() => Exercise, exercise => exercise.bodyPart)
    exercises: Exercise[];
}

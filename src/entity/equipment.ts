// Equipment Entity
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exercise } from './exercise.entity';

@Entity('Equipments') // Specify the table name (optional)
@Unique(['name'])
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @ManyToMany(() => Exercise, (exercise) => exercise.equipments)
  @JoinTable() // JoinTable decorator needed for many-to-many relationships
  exercises: Exercise[];
}

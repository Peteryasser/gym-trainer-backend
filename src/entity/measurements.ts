// BodyPart Entity
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Decimal128,
  Double,
} from 'typeorm';
import { User } from './user.entity';


@Entity({ name: 'measurements' })
export class Measurements {
  @PrimaryGeneratedColumn()
  id: number;

  //@ManyToOne(() => User, (user) => user., { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @Column({ type: 'timestamp' })
  date: Date;

  /*@Column({ type: 'double' })
  weight: Double;*/
}
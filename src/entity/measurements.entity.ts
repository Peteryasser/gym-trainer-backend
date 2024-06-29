import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('measurements')
export class Measurements {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.measurements, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
  
  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  body_fat: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  weight_goal: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  waist: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  neck: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  shoulders: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  chest: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  arm: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  forearm: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  wrist: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  hips: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  thighs: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  calf: number;
}

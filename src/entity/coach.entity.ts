import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('coaches')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.coach, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;
}

import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../entities/user.entity';

@Entity('coaches')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('users_keys')
export class UserKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @OneToOne(() => User, (user) => user.keys)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  encryptedPrivateKey: string;

  @Column()
  publicKey: string;
}

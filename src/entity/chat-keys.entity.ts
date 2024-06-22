import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('chats_keys')
export class ChatKeys {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  chatId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAId' })
  userA: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userBId' })
  userB: User;

  @Column()
  symmetricEncryptedByPubA: string;

  @Column()
  symmetricEncryptedByPubB: string;

  @CreateDateColumn()
  created_on: Date;
}

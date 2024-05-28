import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Package } from './coach-package.entity';
import { AppNotification } from './notification';

@Entity('coaches')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.coach, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @OneToMany(() => Package, (packs) => packs.coach, { cascade: true })
  packages: Package[];

  @OneToMany(() => AppNotification, (notifications) => notifications.coach)
  notifications: AppNotification[];
}

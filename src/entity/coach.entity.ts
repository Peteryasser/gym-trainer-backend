import {
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from './user.entity';
import { Package } from './coach-package.entity';
import { AppNotification } from './app-notification.entity';
import { CoachCertificate } from './coach-certificate.entity';

@Entity('coaches')
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, nullable: false })
  rating: number;

  @OneToOne(() => User, (user) => user.coach, { lazy: true })
  @JoinColumn({ name: 'user_id' })
  user: Promise<User>;

  @OneToMany(() => Package, (packs) => packs.coach, { cascade: true })
  packages: Package[];

  @OneToMany(() => AppNotification, (notifications) => notifications.coach)
  notifications: AppNotification[];

  @OneToMany(() => CoachCertificate, (certificates) => certificates.coach)
  certificates: CoachCertificate[];
}

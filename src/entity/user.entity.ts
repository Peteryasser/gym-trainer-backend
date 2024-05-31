import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Device } from './device.entity';
import { Coach } from './coach.entity';
import { UserSubscription } from './user-subscription.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ length: 10 })
  gender: string;

  @Column({ length: 255, nullable: true })
  profilePictureUrl: string;

  @Column({ length: 10, default: '+20' })
  countryCode: string;

  @Column({ length: 20 })
  phoneNumber: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ length: 6, nullable: true, default: null })
  verificationToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  verificationTokenSentAt: Date;

  @Column({ length: 6, nullable: true, default: null })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  resetPasswordTokenSentAt: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isSocialAccount: boolean;

  @Column({ default: true })
  enableNotifications: boolean;

  @Column({ length: 10, default: 'en' })
  defaultLocale: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Device, (device) => device.user)
  devices: Device[];

  @OneToOne(() => Coach, (coach) => coach.user, { cascade: true, eager: true })
  coach: Coach;

  @OneToMany(() => UserSubscription, (subsciption) => subsciption.user)
  subscriptions: UserSubscription[];

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

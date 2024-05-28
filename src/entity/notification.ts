import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';
import { Coach } from './coach.entity';
import { validateOrReject } from 'class-validator';

@Entity('notifications')
export class AppNotification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column({ nullable: true })
  coachId: number;

  @ManyToOne(() => User, (user) => user.notifications, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.notifications, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'coachId' })
  coach: Coach;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ nullable: true })
  link: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async checkUserOrCoachId() {
    if ((this.userId && this.coachId) || (!this.userId && !this.coachId)) {
      throw new Error('Either userId or coachId must be set, but not both');
    }

    await validateOrReject(this);
  }
}

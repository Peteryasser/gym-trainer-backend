import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSubscription } from './user-subscription.entity';
import { User } from './user.entity';

@Entity('subscription_reviews')
export class SubscriptionReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  subscriptionId: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => UserSubscription, (subscription) => subscription.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'subscriptionId' })
  subscription: UserSubscription;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

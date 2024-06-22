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

@Entity('subscription_reviews')
export class SubscriptionReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  comment: string;

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

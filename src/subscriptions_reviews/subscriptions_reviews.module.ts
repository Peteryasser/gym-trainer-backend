import { Module } from '@nestjs/common';
import { SubscriptionReviewController } from './controller/subscriptions_reviews.controller';
import { SubscriptionsReviewsService } from './service/subscriptions_reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionReview } from '../entity/subscription-review.entity';
import { Coach } from '../entity/coach.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionReview, Coach])],
  controllers: [SubscriptionReviewController],
  providers: [SubscriptionsReviewsService],
})
export class SubscriptionsReviewsModule {}

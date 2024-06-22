import { Module } from '@nestjs/common';
import { SubscriptionReviewController } from './controller/subscriptions_reviews.controller';
import { SubscriptionsReviewsService } from './service/subscriptions_reviews.service';

@Module({
  controllers: [SubscriptionReviewController],
  providers: [SubscriptionsReviewsService],
})
export class SubscriptionsReviewsModule {}

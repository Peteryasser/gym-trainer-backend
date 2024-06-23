import { Module } from '@nestjs/common';
import { SubscriptionReviewController } from './controller/subscriptions_reviews.controller';
import { SubscriptionsReviewsService } from './service/subscriptions_reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionReview } from 'src/entity/subscription-review.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionReview])],
  controllers: [SubscriptionReviewController],
  providers: [SubscriptionsReviewsService],
})
export class SubscriptionsReviewsModule {}

import { Module } from '@nestjs/common';
import { SubscriptionReviewController } from './controller/subscriptions_reviews.controller';
import { SubscriptionsReviewsService } from './service/subscriptions_reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionReview } from 'src/entity/subscription-review.entity';
import { Coach } from 'src/entity/coach.entity';
@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionReview, Coach])],
  controllers: [SubscriptionReviewController],
  providers: [SubscriptionsReviewsService],
})
export class SubscriptionsReviewsModule {}

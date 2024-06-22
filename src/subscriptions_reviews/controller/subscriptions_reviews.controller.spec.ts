import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionReviewController } from './subscriptions_reviews.controller';

describe('SubscriptionsReviewsController', () => {
  let controller: SubscriptionReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionReviewController],
    }).compile();

    controller = module.get<SubscriptionReviewController>(
      SubscriptionReviewController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

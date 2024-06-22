import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsReviewsService } from './subscriptions_reviews.service';

describe('SubscriptionsReviewsService', () => {
  let service: SubscriptionsReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubscriptionsReviewsService],
    }).compile();

    service = module.get<SubscriptionsReviewsService>(
      SubscriptionsReviewsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

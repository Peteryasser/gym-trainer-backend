import { Test, TestingModule } from '@nestjs/testing';
import { CoachSocialMediaService } from './coach-social-media.service';

describe('CoachSocialMediaService', () => {
  let service: CoachSocialMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachSocialMediaService],
    }).compile();

    service = module.get<CoachSocialMediaService>(CoachSocialMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

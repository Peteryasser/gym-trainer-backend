import { Test, TestingModule } from '@nestjs/testing';
import { CoachSocialMediaController } from './coach-social-media.controller';

describe('CoachSocialMediaController', () => {
  let controller: CoachSocialMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachSocialMediaController],
    }).compile();

    controller = module.get<CoachSocialMediaController>(
      CoachSocialMediaController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

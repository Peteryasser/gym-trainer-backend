import { Test, TestingModule } from '@nestjs/testing';
import { PostLikesController } from './likes.controller';

describe('LikesController', () => {
  let controller: PostLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostLikesController],
    }).compile();

    controller = module.get<PostLikesController>(PostLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

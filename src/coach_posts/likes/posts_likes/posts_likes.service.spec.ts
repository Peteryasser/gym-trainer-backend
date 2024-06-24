import { Test, TestingModule } from '@nestjs/testing';
import { PostsLikesService } from './posts_likes.service';

describe('PostsLikesService', () => {
  let service: PostsLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsLikesService],
    }).compile();

    service = module.get<PostsLikesService>(PostsLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

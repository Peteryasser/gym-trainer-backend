import { Test, TestingModule } from '@nestjs/testing';
import { TestCloudinaryService } from './test_cloudinary.service';

describe('TestCloudinaryService', () => {
  let service: TestCloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestCloudinaryService],
    }).compile();

    service = module.get<TestCloudinaryService>(TestCloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

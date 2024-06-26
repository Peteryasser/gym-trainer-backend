import { Test, TestingModule } from '@nestjs/testing';
import { CoachCertificatesService } from './coach_certificates.service';

describe('CoachCertificatesService', () => {
  let service: CoachCertificatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachCertificatesService],
    }).compile();

    service = module.get<CoachCertificatesService>(CoachCertificatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

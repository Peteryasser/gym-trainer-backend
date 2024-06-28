import { Test, TestingModule } from '@nestjs/testing';
import { CoachCertificateService } from './coach_certificates.service';

describe('CoachCertificatesService', () => {
  let service: CoachCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachCertificateService],
    }).compile();

    service = module.get<CoachCertificateService>(CoachCertificateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

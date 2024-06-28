import { Test, TestingModule } from '@nestjs/testing';
import { CoachCertificateController } from './coach_certificates.controller';

describe('CoachCertificatesController', () => {
  let controller: CoachCertificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachCertificateController],
    }).compile();

    controller = module.get<CoachCertificateController>(
      CoachCertificateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

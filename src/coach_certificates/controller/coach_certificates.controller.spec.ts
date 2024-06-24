import { Test, TestingModule } from '@nestjs/testing';
import { CoachCertificatesController } from './coach_certificates.controller';

describe('CoachCertificatesController', () => {
  let controller: CoachCertificatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachCertificatesController],
    }).compile();

    controller = module.get<CoachCertificatesController>(CoachCertificatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CryptoRsaController } from './crypto-rsa.controller';

describe('CryptoRsaController', () => {
  let controller: CryptoRsaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoRsaController],
    }).compile();

    controller = module.get<CryptoRsaController>(CryptoRsaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

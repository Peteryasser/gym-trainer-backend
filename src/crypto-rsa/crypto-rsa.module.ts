import { Module } from '@nestjs/common';
import { CryptoRsaService } from './crypto-rsa.service';
import { CryptoRsaController } from './crypto-rsa.controller';

@Module({
  providers: [CryptoRsaService],
  controllers: [CryptoRsaController]
})
export class CryptoRsaModule {}

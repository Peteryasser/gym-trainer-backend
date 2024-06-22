import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';

@Module({
  providers: [CryptoService],
})
export class CryptoModule {}

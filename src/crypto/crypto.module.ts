import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from 'src/entity/user-keys.entity';
import { CryptoService } from './service/crypto.service';
import { CryptoController } from './controller/crypto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys])],
  providers: [CryptoService],
  controllers: [CryptoController],
  exports: [CryptoService],
})
export class CryptoModule {}

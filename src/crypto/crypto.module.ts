import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from 'src/entity/user-keys.entity';
import { CryptoController } from './controller/crypto.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys])],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}

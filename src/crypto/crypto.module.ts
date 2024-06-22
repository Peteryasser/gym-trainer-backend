import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';
import { CryptoController } from './controller/crypto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from 'src/entity/user-keys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys])],
  providers: [CryptoService],
  controllers: [CryptoController],
})
export class CryptoModule {}

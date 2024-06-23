import { Module } from '@nestjs/common';
import { CryptoService } from './service/crypto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from 'src/entity/user-keys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys])],
  providers: [CryptoService],
  controllers: [],
})
export class CryptoModule {}

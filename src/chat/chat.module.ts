import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { CryptoService } from '../crypto/service/crypto.service';
import { UserKeys } from '../entity/user-keys.entity';
import { ChatKeys } from '../entity/chat-keys.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys, ChatKeys, User ])],
  controllers: [ChatController],
  providers: [FirebaseService, CryptoService],
})
export class ChatModule {}

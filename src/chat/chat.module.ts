import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { CryptoService } from 'src/crypto/service/crypto.service';
import { UserKeys } from 'src/entity/user-keys.entity';
import { ChatKeys } from 'src/entity/chat-keys.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys, ChatKeys, User ])],
  controllers: [ChatController],
  providers: [FirebaseService, CryptoService],
})
export class ChatModule {}

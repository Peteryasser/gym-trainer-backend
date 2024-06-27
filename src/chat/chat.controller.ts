import { Controller, Post, Body } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { assert, log } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatKeys } from 'src/entity/chat-keys.entity';
import { User } from 'src/entity/user.entity';
import { CryptoService } from 'src/crypto/service/crypto.service';
import { UserKeys } from 'src/entity/user-keys.entity';

@Controller('chat')
export class ChatController {
  constructor(
    private readonly firebaseService: FirebaseService,

    private readonly cryptoService: CryptoService,

    @InjectRepository(ChatKeys)
    private readonly chatKeysRepo: Repository<ChatKeys>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(UserKeys)
    private readonly userKeysRepo: Repository<UserKeys>,
  ) {}

  @Post('create')
  async createDummyDocument(@Body() data: any) {
    log('data', data);
    const docId =
      await this.firebaseService.createDocumentInTestCollection(data);
    return { docId };
  }

  @Post('exists')
  async checkDocumentExists(@Body() data: any) {
    var userAId = data.userAId;
    var userBId = data.userBId;

    const existsA = await this.chatKeysRepo.find({
      where: { userAId: userAId, userBId: userBId },
    });
    const existsB = await this.chatKeysRepo.find({
      where: { userAId: userBId, userBId: userAId },
    });
    var exists = false;
    if (existsA.length > 0 || existsB.length > 0) {
      exists = true;
    }

    return { exists };
  }


  @Post('getCorrespondingUserInChat')
  async getCorrespondingUserInChat(@Body() data: any) {
    const { chatId, requesterId } = data;
  
    const chatKeys = await this.chatKeysRepo.findOne({ where: { id: chatId } });
    if (!chatKeys) return { message: 'no chat found' };
  
    const { userAId, userBId } = chatKeys;
  
    if (requesterId !== userAId && requesterId !== userBId) return { message: 'not allowed' };
  
    let correspondingUserId = requesterId === userAId ? userBId : userAId;
    const user = await this.userRepo.findOne({ where: { id: correspondingUserId } });
  
    if (!user) return { message: 'user not found' };
  
    const { id, username, firstName, lastName, profilePictureUrl } = user;
  
    return { message: 'success', user: { id, username, firstName, lastName, profilePictureUrl } };
  }
  

  @Post('getCorrespondingUsersInChats')
  async getCorrespondingUsersInChats(@Body() data: any) {

    const { chatIds, requesterId } = data;
    console.log('=============================================')
    console.log('chatIds', chatIds);
    console.log('requesterId', requesterId);

    
    const results = [];

    for (const chatId of chatIds) {
      const chatKeys = await this.chatKeysRepo.findOne({ where: { id: chatId } });
      if (!chatKeys) {
        console.log('no chat found');
        results.push({ chatId, message: 'no chat found' });
        continue;
      }

      const { userAId, userBId } = chatKeys;
      console.log('userAId', userAId);
      console.log('userBId', userBId);  
      
      console.log('requesterIdType', typeof requesterId);
      console.log('userAIdType', typeof userAId);
      console.log('userBIdType', typeof userBId);

      if (requesterId !== userAId && requesterId !== userBId) {
        console.log('not allowed');
        results.push({ chatId, message: 'not allowed' });
        continue;
      }

      const correspondingUserIdLetter = requesterId === userAId ? 'B' : 'A';

      const correspondingUserId = correspondingUserIdLetter === 'B' ? userBId : userAId;
      const user = await this.userRepo.findOne({ where: { id: correspondingUserId } });

      if (!user) {
        console.log('user not found');
        results.push({ chatId, message: 'user not found' });
        continue;
      }

      const encryptSymmetricKey = correspondingUserIdLetter === 'B' ? chatKeys.symmetricEncryptedByPubA : chatKeys.symmetricEncryptedByPubB;

      const { id, username, firstName, lastName, profilePictureUrl } = user;
      console.log('success');

      results.push({
        chatId,
        message: 'success',
        user: { id, username, firstName, lastName, profilePictureUrl },
        key: encryptSymmetricKey
      });
    }
    console.log('results', results);  
    return results;
  }

  // async createDocument(@Body() data: any) {
  //   log('data', data);

  //   const docId = await this.firebaseService.createSubcollection(data);
  //   return { docId };
  // }

  @Post('getOrCreateNew')
  async getOrCreateNew(@Body() data: any) {
    var userAId = data.userAId;
    var userBId = data.userBId;

    const existsA = await this.chatKeysRepo.find({
      where: { userAId: userAId, userBId: userBId },
    });
    const existsB = await this.chatKeysRepo.find({
      where: { userAId: userBId, userBId: userAId },
    });
    var result = null;
    var exists = false;
    if (existsA.length > 0) {
      result = existsA[0];
      assert(result.length === 1);
      exists = true;
    }
    if (existsB.length > 0) {
      result = existsB[0];
      assert(result.length === 1);
      exists = true;
    }

    if (exists === true) return { message: 'old', result: result };

    const userA = await this.userRepo.findOne({ where: { id: userAId } });
    const userB = await this.userRepo.findOne({ where: { id: userBId } });
    const newChatKeys = new ChatKeys();
    newChatKeys.userA = userA;
    newChatKeys.userB = userB;
    newChatKeys.userAId = userAId;
    newChatKeys.userBId = userBId;
    // TODO - generate symmetric key

    const pubKeyA = (
      await this.userKeysRepo.findOne({ where: { userId: userAId } })
    ).publicKey;

    const pubKeyB = (
      await this.userKeysRepo.findOne({ where: { userId: userBId } })
    ).publicKey;

    const symmetricKey = this.cryptoService.generateSymmetricKey();
    const symmetricEncryptedByPubA = this.cryptoService.encryptSymmetricKey(this.cryptoService.extractCompressedPublicKey(pubKeyA), symmetricKey);

    const symmetricEncryptedByPubB = this.cryptoService.encryptSymmetricKey(this.cryptoService.extractCompressedPublicKey(pubKeyB), symmetricKey);

    newChatKeys.symmetricEncryptedByPubA = symmetricEncryptedByPubA;
    newChatKeys.symmetricEncryptedByPubB = symmetricEncryptedByPubB;
    const saved = await this.chatKeysRepo.save(newChatKeys);
    result = saved;

    const docId = await this.firebaseService.createSubcollection(saved.id.toString());
    const chatIdResponse = await this.firebaseService.addChatIdToUsers(saved.id.toString(), userAId.toString(), userBId.toString());
    console.log('docId', docId);
    console.log('chatIdResponse', chatIdResponse);

    return { message: 'new', result: result };
  }
}

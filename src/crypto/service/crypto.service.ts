import { Injectable } from '@nestjs/common';
import { ec as EC } from 'elliptic';
import * as crypto from 'crypto';
import { UserKeys } from 'src/entity/user-keys.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private ec: EC;

  constructor(
    @InjectRepository(UserKeys)
    private readonly keysRepo: Repository<UserKeys>,
  ) {
    this.ec = new EC('secp256k1');
  }

  async saveKeyPair(userId: number, password: string) {
    const keyPair = this.generateKeyPair();

    const keys = new UserKeys();
    keys.salt = await this.generateBrainKeySalt();
    keys.encryptedPrivateKey = this.encryptPrivKey(
      keyPair.privKey,
      password,
      keys.salt,
    );

    keys.publicKey = keyPair.pubKey;
    keys.userId = userId;

    await this.keysRepo.save(keys);
  }

  private generateKeyPair() {
    const keyPair = this.ec.genKeyPair();
    const pubKey = keyPair.getPublic('hex');
    const privKey = keyPair.getPrivate('hex');
    return { pubKey, privKey };
  }

  encryptPrivKey(privateKey: string, password: string, salt: string): string {
    const brainKey = this.generateBrainKey(password, salt);
    return this.encrypt(brainKey.toString('hex'), privateKey);
  }

  decryptPrivKey(
    encryptedPrivateKey: string,
    password: string,
    salt: string,
  ): string {
    const brainKey = this.generateBrainKey(password, salt);
    return this.decrypt(brainKey.toString('hex'), encryptedPrivateKey);
  }

  encrypt(key: string, data: string): string {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'hex'),
      iv,
    );

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${encrypted}:${authTag}`;
  }

  decrypt(key: string, data: string): string {
    const [ivHex, encryptedData, authTagHex] = data.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm', // aes-256-ctr
      Buffer.from(key, 'hex'),
      iv,
    );

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  private generateBrainKey(password: string, salt: string): Buffer {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha512');
  }

  private async generateBrainKeySalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  // New method to generate a symmetric key
  generateSymmetricKey(): string {
    const key = crypto.randomBytes(32); // Generate a 256-bit (32 bytes) key
    return key.toString('hex');
  }






}

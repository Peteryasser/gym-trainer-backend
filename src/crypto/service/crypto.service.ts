import { Injectable } from '@nestjs/common';
import { ec as EC } from 'elliptic';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  private ec: EC;

  constructor() {
    this.ec = new EC('secp256k1');
  }

  generateKeyPair() {
    const keyPair = this.ec.genKeyPair();
    const pubKey = keyPair.getPublic('hex');
    const privKey = keyPair.getPrivate('hex');
    return { pubKey, privKey };
  }

  encryptPrivKey(privateKey: string, password: string): string {
    const brainKey = this.generateBrainKey(password);
    return this.encrypt(brainKey.toString('hex'), privateKey);
  }

  decryptPrivKey(encryptedPrivateKey: string, password: string): string {
    const brainKey = this.generateBrainKey(password);
    return this.decrypt(brainKey.toString('hex'), encryptedPrivateKey);
  }

  private encrypt(key: string, data: string): string {
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

  private decrypt(key: string, data: string): string {
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

  private generateBrainKey(password: string): Buffer {
    return crypto.pbkdf2Sync(
      password,
      // salt needs to be stored? otherwise calling this function multiple times on the same password will return diff values for the key
      bcrypt.genSaltSync(),
      100000, // rounds
      32, // keylen --> based on algorithm (aes256gcm requires 32 bytes key)
      'sha512', // digest
    );
  }
}

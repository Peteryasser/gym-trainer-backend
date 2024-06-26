import { Body, Controller, Get, Post } from '@nestjs/common';
import { CryptoRsaService } from './crypto-rsa.service';
import * as NodeRSA from 'node-rsa';

@Controller('crypto-rsa')
export class CryptoRsaController {
  private static readonly dummyKeys = {
    publicKey: `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiq71H0H6bbIpuhXJYeoh\nMHMR5Z+roWg8xQCaX8GLzOxGnbB7st+9WRqFVOhcmoqgzPnS1LAAqmy259qJFAtO\nOL3dTcgR6E2uvvOxMgX2rlnmSiN+CIr3m457YLzMwOdM1n0uwklNM8Z/Nt6MQf57\n+jfh+bCGB1R7jQaCSZCdHLkNnPiHckKPiyfra4wEr73xU95OTohVYzhQyuqI9f0O\n8mio0iCVHEuurWI2frH92Y1DuLjQyVVkZzke0zs8Kx1Er1aM8O3kPSEpO3T8b3Ov\n7AQ+6WbI0w4qOPz3VN0m2n1qvRJbKdQmFQDOS9uub4xa9exKIEbeAJSKO3hv5IeW\ntQIDAQAB\n-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEAiq71H0H6bbIpuhXJYeohMHMR5Z+roWg8xQCaX8GLzOxGnbB7\nst+9WRqFVOhcmoqgzPnS1LAAqmy259qJFAtOOL3dTcgR6E2uvvOxMgX2rlnmSiN+\nCIr3m457YLzMwOdM1n0uwklNM8Z/Nt6MQf57+jfh+bCGB1R7jQaCSZCdHLkNnPiH\nckKPiyfra4wEr73xU95OTohVYzhQyuqI9f0O8mio0iCVHEuurWI2frH92Y1DuLjQ\nyVVkZzke0zs8Kx1Er1aM8O3kPSEpO3T8b3Ov7AQ+6WbI0w4qOPz3VN0m2n1qvRJb\nKdQmFQDOS9uub4xa9exKIEbeAJSKO3hv5IeWtQIDAQABAoIBAHBXCXkomRQDHon+\n3ALVBc2ZaQX5Ma6uIYvz0RmATx7QxuM18v4S/+8N7LO7Bkipw1hHhuGDMQbcyc1G\n2YPDJLoSExLO3rKvOr6z6PX8nrbdXA7ycUW6TJlV8duLFNGujC+zeA0qE7+9K4/m\n9vb+jq9CVWtN80Q8y1iRzTiKTLrWdkYSpJXEi/tC6lUnSQb8MYzog6FXj5vI62bJ\nUj+jjLK72plgkHfPYOShHbKPbdaC8UzOcRkBAOOZ2e3TrsaNjET6BK6ucgib59FI\niTXHCvxxVNcGF+guLyF2RIhVbwBhCa6ncqpzakmUxnroH8nY7t6QpU68Lheueqrm\nBvhGOIECgYEA4doMPy/oz/MS1ic0QeGJ+TQrU0H10RDEm4CM8/RG7czAM6XUL9Fk\nhcRe+EdtWci2Qcsm4jN2Tnz497KR0N+OLFTA2jp+3f4uq7Hl1HZjvPztQQxEGLiR\nNONRkmA8kU6oZRJqTT8LMFhctf1TLymor3t7BSoXam9lb+98/83c2nMCgYEAnTIj\nKkhTGsrHSLC817kJke1EuUP+JLYEkgg4lM8lotBwEgD170hHyv5MOGlbA44O+/0A\nlQzBy9L5pSlkTgELiEsfmsCuIjgXIwxVx4mSfcvFR0ZmNB+0jUEeygkGeG5IFrgn\nMwT9BEGpHBbBxY03L8NHbshZIWDmzBf59oAmuDcCgYEAyq0eaGXaCyMbOEsePjDj\n3FrQtnpu2hquFM4br6D7NdOUd8TM0cya5OAASdXvb68Kv6hLUJrWBEFqOv5olITJ\n1UaJek0cJKNBxppyoWNMxgBD+SfExFp9FHUacr0iHVP1Eh6gfomgxNXG/RpEWAKO\nekvZbh0DvmQRJ45HIlffZbkCgYEAkYz89oelO2eLAolzMaOJcu7o9Uo5pbBLpxOp\noE/1nz20p1bwYTDiGNlBpfIXbcE5qqVmxpvbTWj58q3SzE83aGl2yAmkstaQxckE\nHBAL7iKhdg9/TsAUo74qThPxQ82JPlAhK6JwzGInvXRs0wigkr8UA0XLEZbx3QRO\nVKnwMB0CgYEAuvnlATKzXlq2VvGX3jMNeh7C+7VZqfsejmH2p4xwiPt2/LQQ+aol\nzS8fXRKnbk0jerH7nz/lVgrEcDGJXQtxR7Fz8F+BN04WWLqUYLtzj8+aUXoPJwkh\n8UmTlVRDlxYz1s0sZbGfUGkGTtynf9djdluqnvL6M+DgaCHuv86WBcc=\n-----END RSA PRIVATE KEY-----`
  };

  constructor(private readonly cryptoRsaService: CryptoRsaService) {}

  @Get('public-key')
  getPublicKey(): string {
    return this.cryptoRsaService.getPublicKey();
  }

  @Get('both-keys')
  getBothKeys(): { publicKey: string; privateKey: string } {
    return this.cryptoRsaService.getBothKeys();
  }

  @Post('encrypt')
  encrypt(@Body('plaintext') plaintext: string): string {
    return this.cryptoRsaService.encrypt(plaintext);
  }

  // @Post('dummy-encrypt')
  // encryptWithKey(@Body('plaintext') plaintext: string): string {
  //   return this.cryptoRsaService.encryptWithKey(plaintext, new NodeRSA(CryptoRsaController.dummyKeys.publicKey));
  // }

  @Post('dummy-decrypt')
  decryptWithKey(@Body('ciphertext') ciphertext: string): string {
    return this.cryptoRsaService.decryptWithKey(ciphertext, new NodeRSA(CryptoRsaController.dummyKeys.privateKey));
  }

  @Post('dummy-both')
  getDummyBothKeys(): void {
    const plaintext = 'Hello, RSA!';
    const encrypted = this.encrypt(plaintext);
    console.log('Encrypted:', encrypted);

    const decrypted = this.decrypt(encrypted);
    console.log('Decrypted:', decrypted);
  }

  @Post('dummy-both2')
  dummyBoth2(): { encrypted: string; decrypted: string } {

    // print(this.cryptoRsaService.)
    const plaintext = 'Hello, RSA!';
    const encrypted = this.cryptoRsaService.encryptWithDummyKeys(plaintext);
    console.log('Encrypted with dummy keys:', encrypted);

    const decrypted = this.cryptoRsaService.decryptWithDummyKeys(encrypted);
    console.log('Decrypted with dummy keys:', decrypted);

    return { encrypted, decrypted };
  }

  @Post('decrypt')
  decrypt(@Body('ciphertext') ciphertext: string): string {
    return this.cryptoRsaService.decrypt(ciphertext);
  }
}
  
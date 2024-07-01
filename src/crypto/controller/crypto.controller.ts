import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('crypto')
export class CryptoController {
  constructor(private readonly crptoService: CryptoService) {}

  @Post()
  async create(@GetUser() user: User, @Body() payload: any): Promise<void> {
    return this.crptoService.saveKeyPair(user.id, payload.password);
  }


  @Post('generateKeyPair')
  async generateKeyPair(){
    
  }

  @Post('encryptHello')
  async encryptHello(){
    var pubKey = '04ff86ebeebda09c7f8d939b3c8202a41a00130ddb2b301cdb16f7281c13fa2a89e48604d55921d3163a02ec135c98255dd8d17e8e1800b862be20fc5a4eef65f4'
    var symmetric = this.crptoService.generateSymmetricKey()
    console.log(symmetric);
    
    // var pubKeyExtracted = this.crptoService.extractCompressedPublicKey(pubKey)
    return this.crptoService.encryptSymmetricKey(pubKey,  symmetric)
  }
}

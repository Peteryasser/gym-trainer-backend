import { Body, Controller, Post } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly crptoService: CryptoService) {}

  @Post()
  async create(@GetUser() user: User, @Body() payload: any): Promise<void> {
    return this.crptoService.saveKeyPair(user.id, payload.password);
  }
}

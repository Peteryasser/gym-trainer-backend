import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CryptoService } from '../service/crypto.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('crypto')
export class CryptoController {
  constructor(private readonly crptoService: CryptoService) {}

  @Post()
  async create(@GetUser() user: User, @Body() payload: any): Promise<void> {
    return this.crptoService.saveKeyPair(user.id, payload.password);
  }
}

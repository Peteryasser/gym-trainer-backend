import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';
import { User } from '../entity/user.entity';
import { Device } from '../entity/device.entity';
import { UsersController } from './controller/users.controller';
import { UserKeys } from 'src/entity/user-keys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device, UserKeys])],
  controllers: [UsersController],

  providers: [UsersService, DevicesService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

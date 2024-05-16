import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';
import { User } from 'src/entity/user.entity';
import { Device } from 'src/entity/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device])],
  providers: [UsersService, DevicesService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { User } from './entities/user.entity';
import { DevicesService } from './service/devices.service';
import { Device } from './entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device])],
  providers: [UsersService, DevicesService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

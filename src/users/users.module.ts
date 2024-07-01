import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { DevicesService } from './service/devices.service';
import { User } from '../entity/user.entity';
import { Device } from '../entity/device.entity';
import { UsersController } from './controller/users.controller';
import { UserKeys } from '../entity/user-keys.entity';
import { CoachesService } from './coaches/coach.service';
import { Coach } from '../entity/coach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device, UserKeys, Coach])],
  controllers: [UsersController],

  providers: [UsersService, DevicesService, CoachesService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}

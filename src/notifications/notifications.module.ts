import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppNotification } from 'src/entity/notification';
import { NotificationsController } from './controller/notifications.controller';
import { NotificationsService } from './service/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppNotification])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}

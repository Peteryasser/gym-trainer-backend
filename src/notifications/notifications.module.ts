import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppNotification } from 'src/entity/app-notification.entity';
import { NotificationsController } from './controller/notifications.controller';
import { NotificationsService } from './service/notifications.service';
import { NotificationListener } from './listeners/notification.listener';

@Module({
  imports: [TypeOrmModule.forFeature([AppNotification])],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationListener],
  exports: [NotificationsService],
})
export class NotificationsModule {}

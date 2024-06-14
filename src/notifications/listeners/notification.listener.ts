import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from '../service/notifications.service';
import { NewUserSubscriptionEvent } from '../events/user-activity-events';
import { NotificationTypeEnum } from '../enums/notification-type.enum';

@Injectable()
export class NotificationListener {
  constructor(private readonly notificationService: NotificationsService) {}

  @OnEvent('new.user.subscription')
  handleNewUserSubscription(event: NewUserSubscriptionEvent) {
    const type = NotificationTypeEnum.NEW_SUBSCRIPTION;
    this.notificationService.create({
      userId: event.userId,
      type: type,
      message: `You have successfully subscribed to package ${event.packageId} of Coach ${event.coachName}!`,
    });

    this.notificationService.create({
      coachId: event.coachId,
      type: type,
      message: `User ${event.userName} has subscribed to your package ${event.packageId}!`,
    });
  }
}

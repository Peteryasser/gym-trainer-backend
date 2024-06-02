import { Module } from '@nestjs/common';
import { UserSubscriptionsService } from './service/user-subscriptions.service';
import { UserSubscriptionController } from './controller/user-subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSubscription } from '../entity/user-subscription.entity';
import { PackagesService } from '../packages/services/packages.service';
import { Package } from '../entity/coach-package.entity';
import { CoachesModule } from '../users/coaches/coaches.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Package, UserSubscription]),
    CoachesModule,
    NotificationsModule,
  ],

  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionsService, PackagesService],
})
export class UserSubscriptionsModule {}

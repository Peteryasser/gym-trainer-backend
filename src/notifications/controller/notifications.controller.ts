import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { NotificationsService } from '../service/notifications.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Coach } from 'src/entity/coach.entity';
import { AppNotification } from 'src/entity/notification';
import { User } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  async getAll(@GetUser() user: User | Coach): Promise<AppNotification[]> {
    if (user instanceof User)
      return this.notificationService.getUserNotifications(user.id);
    else return this.notificationService.getCoachNotifications(user.id);
  }

  @Get('unread_count')
  async getUnreadCount(@GetUser() user: User | Coach): Promise<number> {
    return this.notificationService.getUnreadCount(user);
  }

  @Patch(':id/read')
  async markAsRead(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<AppNotification> {
    return this.notificationService.markAsRead(id, user);
  }

  @Patch('read')
  async markAllAsRead(
    @GetUser() user: User | Coach,
  ): Promise<AppNotification[]> {
    await this.notificationService.markAllAsRead(user);
    return this.getAll(user);
  }

  @Patch(':id/unread')
  async markAsUnread(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<AppNotification> {
    return this.notificationService.markAsUnread(id, user);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<any> {
    await this.notificationService.delete(id, user);

    return { success: true, message: 'Notification deleted successfully' };
  }
}

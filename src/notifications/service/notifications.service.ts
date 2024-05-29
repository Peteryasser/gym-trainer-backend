import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { AppNotification } from '../../entity/notification';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(AppNotification)
    private readonly notificationRepository: Repository<AppNotification>,
  ) {}

  async createNotification(data: {
    userId?: number;
    coachId?: number;
    title: string;
    content: string;
    link?: string;
  }): Promise<AppNotification> {
    const notification = this.notificationRepository.create(data);
    return this.notificationRepository.save(notification);
  }

  async getUserNotifications(userId: number): Promise<AppNotification[]> {
    return this.notificationRepository.find({ where: { userId } });
  }

  async getCoachNotifications(coachId: number): Promise<AppNotification[]> {
    return this.notificationRepository.find({ where: { coachId } });
  }

  async markAsRead(
    id: number,
    currentUser: User | Coach,
  ): Promise<AppNotification> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser;
    else coach = currentUser;

    const result = await this.notificationRepository.update(
      { id: id, user: user, coach: coach },
      { isRead: true },
    );
    if (result.affected == 0) {
      throw new NotFoundException('Notification not found');
    }

    return await this.getById(id);
  }

  async markAllAsRead(currentUser: User | Coach): Promise<void> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser;
    else coach = currentUser;

    await this.notificationRepository.update(
      { user: user, coach: coach },
      { isRead: true },
    );
  }

  async markAsUnread(
    id: number,
    currentUser: User | Coach,
  ): Promise<AppNotification> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser;
    else coach = currentUser;

    const result = await this.notificationRepository.update(
      { id: id, user: user, coach: coach },
      { isRead: false },
    );
    if (result.affected == 0) {
      throw new NotFoundException('Notification not found');
    }

    return await this.getById(id);
  }

  async getById(id: number): Promise<AppNotification> {
    const notification = await this.notificationRepository.findOneBy({
      id: id,
    });
    if (!notification) throw new NotFoundException('Notification not found');

    return notification;
  }

  async delete(id: number, currentUser: User | Coach): Promise<void> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser;
    else coach = currentUser;

    const result = await this.notificationRepository.delete({
      id: id,
      coach: coach,
      user: user,
    });
    if (!result.affected) throw new NotFoundException('Notification not found');
  }
}

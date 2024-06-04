import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { AppNotification } from '../../entity/app-notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(AppNotification)
    private readonly notificationRepository: Repository<AppNotification>,
  ) {}

  async create(data: {
    userId?: number;
    coachId?: number;
    title: string;
    message: string;
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

  async getUnreadCount(user: User | Coach): Promise<number> {
    const query = this.notificationRepository.createQueryBuilder();
    query.andWhere({ isRead: false });

    if (user instanceof User) query.andWhere({ user: user });
    else query.andWhere({ coach: user });

    return await query.getCount();
  }

  async markAsRead(
    id: number,
    currentUser: User | Coach,
  ): Promise<AppNotification> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser.id;
    else coach = currentUser.id;

    await this.executeQuery(null, user, coach, { isRead: true }, 'update');

    return await this.getById(id);
  }

  async markAllAsRead(currentUser: User | Coach): Promise<void> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser.id;
    else coach = currentUser.id;

    await this.executeQuery(null, user, coach, { isRead: true }, 'update');
  }

  async markAsUnread(
    id: number,
    currentUser: User | Coach,
  ): Promise<AppNotification> {
    let coach = null;
    let user = null;

    if (currentUser instanceof User) user = currentUser.id;
    else coach = currentUser.id;

    await this.executeQuery(id, user, coach, { isRead: false }, 'update');

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

    if (currentUser instanceof User) user = currentUser.id;
    else coach = currentUser.id;

    await this.executeQuery(id, user, coach, {}, 'delete');
  }

  private async executeQuery(
    id: number,
    userId: number,
    coachId: number,
    updateData: Partial<AppNotification>,
    operation: 'update' | 'delete',
  ): Promise<void> {
    const query = this.notificationRepository.createQueryBuilder();

    if (id !== null) {
      query.andWhere('id = :id', { id });
    }

    if (userId === null) {
      query.andWhere('userId IS NULL');
    } else {
      query.andWhere('userId = :userId', { userId });
    }

    if (coachId === null) {
      query.andWhere('coachId IS NULL');
    } else {
      query.andWhere('coachId = :coachId', { coachId });
    }

    let result: UpdateResult | DeleteResult;
    if (operation === 'update') {
      result = await query.update(AppNotification).set(updateData).execute();
    } else if (operation === 'delete') {
      result = await query.delete().from(AppNotification).execute();
    }

    if (!result.affected) {
      throw new NotFoundException('Notification not found');
    }
  }
}

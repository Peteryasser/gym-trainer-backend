import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSubscription } from '../../entity/user-subscription.entity';
import { Repository } from 'typeorm';
import { User } from '../../entity/user.entity';
import { CreateSubscriptionDto } from '../dtos/create-subscription.dto';
import { PackagesService } from '../../packages/services/packages.service';
import { DurationUnitEnum } from '../../packages/duration-unit.enum';
import { add } from 'date-fns';
import { SubscriptionDto } from '../dtos/subscription.dto';
import { Coach } from '../../entity/coach.entity';
import { SubscriptionFilterDto } from '../dtos/subscription-filter.dto';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';
import { paginate } from '../../utils/pagination/pagination.util';
import { NotificationsService } from 'src/notifications/service/notifications.service';
import { Package } from 'src/entity/coach-package.entity';

@Injectable()
export class UserSubscriptionsService {
  constructor(
    @InjectRepository(UserSubscription)
    private readonly subscriptionRepository: Repository<UserSubscription>,
    private readonly packageService: PackagesService,
    private readonly notificationService: NotificationsService,
  ) {}

  async createSubscription(
    user: User,
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<SubscriptionDto> {
    if (!createSubscriptionDto.startDate) {
      createSubscriptionDto.startDate = new Date().toISOString();
    }

    const packageId = createSubscriptionDto.packageId;

    const packageEntity = await this.packageService.getById(packageId);
    if (!packageEntity) {
      throw new NotFoundException('Package not found');
    }

    const existingSubscriptions = await this.subscriptionRepository.find({
      where: {
        user: { id: user.id },
        package: { id: packageId },
      },
    });

    const startDate: Date = new Date(createSubscriptionDto.startDate);

    const endDate: Date = this.computeEndDate(
      startDate,
      packageEntity.duration,
      packageEntity.durationUnit,
    );

    this.checkOverlappingSubscription(
      startDate,
      endDate,
      existingSubscriptions,
    );

    const newSubscription = this.subscriptionRepository.create({
      user,
      package: packageEntity,
      startDate: startDate,
      endDate: endDate,
    });

    const savedSubscription =
      await this.subscriptionRepository.save(newSubscription);

    this.notifySubscriptionObservers(user, packageEntity);

    return await this.getById(savedSubscription.id, user);
  }

  async getAll(
    user: User | Coach,
    filterDto: SubscriptionFilterDto,
  ): Promise<PaginatedResultDto<SubscriptionDto>> {
    let query = this.subscriptionRepository
      .createQueryBuilder('subscription')
      .leftJoinAndSelect('subscription.package', 'package')
      .leftJoinAndSelect('package.coach', 'coach')
      .leftJoinAndSelect('subscription.user', 'user');

    if (filterDto.sortBy)
      query = query.orderBy(
        `subscription.${filterDto.sortBy}`,
        filterDto.sortOrder || 'ASC',
      );

    if (filterDto.active !== undefined) {
      const now = new Date();
      if (filterDto.active) {
        query.andWhere('subscription.endDate >= :now', { now });
      } else {
        query.andWhere('subscription.endDate < :now', { now });
      }
    }

    if (user instanceof User && filterDto.coachId)
      query = query
        .andWhere('coach.id = :coachId', {
          coachId: filterDto.coachId,
        })
        .andWhere('user.id = :userId', {
          userId: user.id,
        });
    else if (user instanceof Coach && filterDto.userId)
      query = query
        .andWhere('user.id = :userId', {
          userId: filterDto.userId,
        })
        .andWhere('coach.id = :coachId', {
          coachId: user.id,
        });

    query = paginate(query, filterDto.page, filterDto.pageSize);

    const [subscriptions, total] = await query.getManyAndCount();

    const data = await Promise.all(
      subscriptions.map((subscription) =>
        SubscriptionDto.fromEntity(subscription),
      ),
    );
    return {
      data,
      total,
      page: filterDto.page,
      pageSize: filterDto.pageSize,
    };
  }

  async getById(
    id: number,
    currentUser: User | Coach,
  ): Promise<SubscriptionDto> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: id },
      relations: ['package', 'package.coach', 'package.coach.user', 'user'],
    });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (
      (currentUser instanceof User &&
        subscription.user.id === currentUser.id) ||
      (currentUser instanceof Coach &&
        subscription.package.coach.id == currentUser.id)
    ) {
      return SubscriptionDto.fromEntity(subscription);
    }
    throw new ForbiddenException('You do not have access to this resource');
  }

  private computeEndDate(
    startDate: Date,
    duration: number,
    durationUnit: DurationUnitEnum,
  ): Date {
    let endDate: Date;
    duration = Math.floor(duration);

    switch (durationUnit) {
      case DurationUnitEnum.DAY:
        endDate = add(startDate, { days: duration });
        break;
      case DurationUnitEnum.WEEK:
        endDate = add(startDate, { weeks: duration });
        break;
      case DurationUnitEnum.MONTH:
        endDate = add(startDate, { months: duration });
        break;
      case DurationUnitEnum.YEAR:
        endDate = add(startDate, { years: duration });
        break;
    }
    return endDate;
  }

  private checkOverlappingSubscription(
    startDate: Date,
    endDate: Date,
    subscriptions: UserSubscription[],
  ): void {
    for (const subscription of subscriptions) {
      if (
        (startDate >= subscription.startDate &&
          startDate <= subscription.endDate) ||
        (endDate >= subscription.startDate &&
          endDate <= subscription.endDate) ||
        (startDate <= subscription.startDate && endDate >= subscription.endDate)
      ) {
        throw new BadRequestException(
          'Subscription dates overlap with an existing subscription',
        );
      }
    }
  }

  private notifySubscriptionObservers(user: User, pack: Package): void {
    this.notificationService.create({
      coachId: pack.coach.id,
      title: `New Package Subscription`,
      message: `User ${user.fullName} has subscribed to your package ${pack.id}`,
    });

    this.notificationService.create({
      userId: user.id,
      title: `Successful Package Subscription`,
      message: `You have successfully subscribed to package ${pack.id}!`,
    });
  }
}

import { UserSubscription } from '../../entity/user-subscription.entity';
import { User } from '../../entity/user.entity';
import { PackageWithCoachDto } from '../../packages/dtos/package-coach.dto';

export class SubscriptionDto {
  id: number;
  startDate: Date;
  endDate: Date;
  package: PackageWithCoachDto;
  userId: number;
  userName: string;
  userProfilePictureUrl: string;
  createdAt: Date;
  updatedAt: Date;

  private constructor(
    subscriptionId: number,
    startDate: Date,
    endDate: Date,
    pack: PackageWithCoachDto,
    user: User,
  ) {
    this.id = subscriptionId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.package = pack;
    this.userId = user.id;
    this.userName = user.fullName;
    this.userProfilePictureUrl = user.profilePictureUrl;
  }

  static async fromEntity(
    subscription: UserSubscription,
  ): Promise<SubscriptionDto> {
    const packageDto = await PackageWithCoachDto.fromEntity(
      subscription.package,
    );
    return new SubscriptionDto(
      subscription.id,
      subscription.startDate,
      subscription.endDate,
      packageDto,
      subscription.user,
    );
  }
}

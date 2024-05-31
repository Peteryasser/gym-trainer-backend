import { Package } from '../../entity/coach-package.entity';
import { DurationUnitEnum } from '../duration-unit.enum';

export class PackageWithCoachDto {
  id: number;
  price: number;
  duration: number;
  durationUnit: DurationUnitEnum;
  description: string;
  hasNutrition: boolean;
  coachId: number;
  coachName: string;
  coachProfilePictureUrl: string;

  private constructor(pack: Package) {
    this.id = pack.id;
    this.price = pack.price;
    this.duration = pack.duration;
    this.durationUnit = pack.durationUnit;
    this.hasNutrition = pack.hasNutrition;
    this.description = pack.description;
    this.coachId = pack.coach.id;
  }

  static async fromEntity(pack: Package): Promise<PackageWithCoachDto> {
    const dto = new PackageWithCoachDto(pack);
    const user = await pack.coach.user;
    dto.coachName = user.fullName;
    dto.coachProfilePictureUrl = user.profilePictureUrl;
    return dto;
  }
}

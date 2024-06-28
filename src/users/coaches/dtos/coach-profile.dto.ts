import { CoachPost } from '../../../entity/coach-post.entity';
import { PackageSummaryDto } from '../../../packages/dtos/package-summary.dto';

export class CoachProfileDto {
  id: number;
  name: string;
  profilePictureUrl: string;
  rating: number;
  reviewsNo: number;
  traineesNo: number;
  mostRecentPost: CoachPost;
  packages: PackageSummaryDto[];
}

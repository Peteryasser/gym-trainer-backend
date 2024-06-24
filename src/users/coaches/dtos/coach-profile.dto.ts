import { CoachPost } from 'src/entity/coach-post.entity';
import { PackageSummaryDto } from 'src/packages/dtos/package-summary.dto';

export class CoachProfileDto {
  id: number;
  name: string;
  profilePictureUrl: string;
  rating: number;
  traineesNo: number;
  mostRecentPost: CoachPost;
  packages: PackageSummaryDto[];
}

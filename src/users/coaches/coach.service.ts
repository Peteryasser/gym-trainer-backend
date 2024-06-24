import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from '../../entity/coach.entity';
import { Repository } from 'typeorm';
import { CoachProfileDto } from './dtos/coach-profile.dto';
import { PackageSummaryDto } from 'src/packages/dtos/package-summary.dto';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  ) {}

  async create(coach: Coach): Promise<Coach> {
    return await this.coachRepository.save(coach);
  }

  async findOneById(
    id: number,
    throwException: boolean = true,
  ): Promise<Coach> {
    const user = await this.coachRepository.findOneBy({ id });

    if (!user && throwException) throw new NotFoundException('Coach not found');

    return user;
  }

  async getProfile(coachId: number): Promise<CoachProfileDto> {
    const coach = await this.coachRepository.findOne({
      where: { id: coachId },
      relations: ['packages', 'posts', 'packages.subscriptions'],
    });

    if (!coach) {
      throw new NotFoundException(`Coach not found`);
    }

    const mostRecentPost = await coach.getLatestPost();
    const packages = await coach.getPackages();

    const packageSummaries: PackageSummaryDto[] = packages.map((pack) => ({
      id: pack.id,
      description: pack.description,
    }));

    const traineesNo = await coach.getTraineesCount();

    return {
      id: coach.id,
      name: (await coach.user).fullName,
      profilePictureUrl: (await coach.user).profilePictureUrl,
      rating: coach.rating,
      traineesNo: traineesNo,
      mostRecentPost: mostRecentPost,
      packages: packageSummaries,
    };
  }
}

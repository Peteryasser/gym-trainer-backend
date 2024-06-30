import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from '../../entity/coach.entity';
import { Repository } from 'typeorm';
import { CoachProfileDto } from './dtos/coach-profile.dto';
import { PackageSummaryDto } from '../../packages/dtos/package-summary.dto';
import { CoachSummaryDto } from './dtos/coach-summary.dto';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';
import { CoachFilterDto } from './dtos/coach-filter.dto';
import { paginate } from '../../utils/pagination/pagination.util';

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
      reviewsNo: await this.getReviewsCount(coachId),
      traineesNo: traineesNo,
      mostRecentPost: mostRecentPost || null,
      packages: packageSummaries,
    };
  }

  async getAll(
    filterDto: CoachFilterDto,
  ): Promise<PaginatedResultDto<CoachSummaryDto>> {
    let query = this.coachRepository
      .createQueryBuilder('coach')
      .leftJoinAndSelect('coach.user', 'user')
      .leftJoinAndSelect('coach.packages', 'packages')
      .leftJoinAndSelect('packages.subscriptions', 'subscriptions')
      .leftJoinAndSelect('subscriptions.reviews', 'reviews');

    if (filterDto.sortBy)
      query = query.orderBy(
        `coach.${filterDto.sortBy}`,
        filterDto.sortOrder || 'ASC',
      );

    if (filterDto.keyword)
      query = query.where(
        "user.firstName || ' ' || user.lastName ILIKE :keyword",
        { keyword: `%${filterDto.keyword}%` },
      );

    if (filterDto.minRating)
      query = query.andWhere('coach.rating >= :minRating', {
        minPrice: filterDto.minRating,
      });

    if (filterDto.maxRating)
      query = query.andWhere('coach.rating <= :maxRating', {
        maxPrice: filterDto.maxRating,
      });

    query = paginate(query, filterDto.page, filterDto.pageSize);

    const [data, total] = await query.getManyAndCount();

    const coachSummaryDtos: CoachSummaryDto[] = await Promise.all(
      data.map(async (coach) => {
        return {
          id: coach.id,
          name: `${(await coach.user).firstName} ${(await coach.user).lastName}`,
          profilePictureUrl: (await coach.user).profilePictureUrl,
          rating: coach.rating,
          reviewsNo: await this.getReviewsCount(coach.id),
        };
      }),
    );
    return {
      data: coachSummaryDtos,
      total,
      page: filterDto.page,
      pageSize: filterDto.pageSize,
    };
  }

  async getReviewsCount(coachId: number): Promise<number> {
    const data = await this.coachRepository
      .createQueryBuilder('coach')
      .leftJoinAndSelect('coach.packages', 'packages')
      .leftJoinAndSelect('packages.subscriptions', 'subscriptions')
      .leftJoinAndSelect('subscriptions.reviews', 'reviews')
      .where('coach.id = :coachId', { coachId })
      .getOne();

    const reviewsCount = data.packages.reduce(
      (acc, pkg) =>
        acc +
        pkg.subscriptions.reduce(
          (subAcc, sub) => subAcc + sub.reviews.length,
          0,
        ),
      0,
    );
    return reviewsCount;
  }
}

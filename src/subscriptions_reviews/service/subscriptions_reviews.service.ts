import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionReview } from 'src/entity/subscription-review.entity';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { ReviewDto } from '../dtos/review.dto';
import { User } from 'src/entity/user.entity';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { Repository } from 'typeorm';
import { PaginatedResultDto } from 'src/dtos/paginatied-result.dto';
import { ReviewFilterDto } from '../dtos/review-filter.dto';
import { paginate } from 'src/utils/pagination/pagination.util';

@Injectable()
export class SubscriptionsReviewsService {
  constructor(
    @InjectRepository(SubscriptionReview)
    private readonly reviewRepository: Repository<SubscriptionReview>,
  ) {}

  async create(
    user: User,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewDto> {
    const review = new SubscriptionReview();

    review.subscriptionId = createReviewDto.subscriptionId;
    review.rating = createReviewDto.rating;
    review.comment = createReviewDto.comment;
    review.userId = user.id;

    const newReview = await this.reviewRepository.create(review);
    const savedReview = await this.reviewRepository.save(newReview);

    return this.getById(savedReview.id);
  }

  async getById(id: number): Promise<ReviewDto> {
    const review = await this.reviewRepository.findOneBy({ id: id });
    return this.buildReviewDto(review);
  }

  async getAll(
    id: number,
    filterDto: ReviewFilterDto,
  ): Promise<PaginatedResultDto<ReviewDto>> {
    let query = this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.user', 'user')
      .leftJoinAndSelect('review.subscription', 'subscription')
      .leftJoinAndSelect('subscription.package', 'package');

    if (filterDto.sortBy)
      query = query.orderBy(
        `review.${filterDto.sortBy}`,
        filterDto.sortOrder || 'ASC',
      );

    if (filterDto.keyword)
      query = query.where('review.comment ILIKE :keyword', {
        keyword: `%${filterDto.keyword}%`,
      });

    if (filterDto.minRating)
      query = query.andWhere('review.rating >= :minRating', {
        minRating: filterDto.minRating,
      });

    if (filterDto.maxRating)
      query = query.andWhere('review.rating >= :maxRating', {
        maxRating: filterDto.maxRating,
      });

    if (id)
      query = query.andWhere('package.coachId = :coachId', {
        coachId: id,
      });

    if (filterDto.userId)
      query = query.andWhere('review.userId = :userId', {
        userId: filterDto.userId,
      });

    query = paginate(query, filterDto.page, filterDto.pageSize);

    const [reviews, total] = await query.getManyAndCount();

    const data = await Promise.all(
      reviews.map((review) => ReviewDto.fromEntity(review)),
    );

    return {
      data,
      total,
      page: filterDto.page,
      pageSize: filterDto.pageSize,
    };
  }

  async update(
    user: User,
    id: number,
    reviewUpdateDto: UpdateReviewDto,
  ): Promise<ReviewDto> {
    const result = await this.reviewRepository.update(
      { id: id, userId: user.id },
      reviewUpdateDto,
    );
    if (result.affected === 0) throw new NotFoundException('Review not found');

    return await this.getById(id);
  }

  async delete(user: User, id: number): Promise<void> {
    const result = await this.reviewRepository.delete({
      id: id,
      userId: user.id,
    });
    if (result.affected === 0) throw new NotFoundException('Review not found');
  }

  async buildReviewDto(review: SubscriptionReview): Promise<ReviewDto> {
    return await ReviewDto.fromEntity(review);
  }
}

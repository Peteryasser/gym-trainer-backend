import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { SubscriptionsReviewsService } from '../service/subscriptions_reviews.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { UpdateReviewDto } from '../dtos/update-review.dto';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { ReviewFilterDto } from '../dtos/review-filter.dto';
import { ReviewDto } from '../dtos/review.dto';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';

@Controller('user_reviews')
@UseGuards(JwtAuthGuard)
export class SubscriptionReviewController {
  constructor(private readonly reviewService: SubscriptionsReviewsService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<ReviewDto> {
    return this.reviewService.create(user, createReviewDto);
  }

  @Get()
  async getAll(
    @Query() filterDto: ReviewFilterDto,
    @GetUser() user: Coach,
  ): Promise<PaginatedResultDto<ReviewDto>> {
    return this.reviewService.getAll(user.id, filterDto);
  }

  @Get('coach/:id')
  async getByCoachId(
    @Query() filterDto: ReviewFilterDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PaginatedResultDto<ReviewDto>> {
    return this.reviewService.getAll(id, filterDto);
  }

  @Get('user/my_reviews')
  async getByUser(
    @GetUser() user: User,
  ): Promise<PaginatedResultDto<ReviewDto>> {
    const filterDto = new ReviewFilterDto();
    filterDto.userId = user.id;
    return this.reviewService.getAll(undefined, filterDto);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ReviewDto> {
    return await this.reviewService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ): Promise<ReviewDto> {
    return await this.reviewService.update(user, id, updateReviewDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<any> {
    await this.reviewService.delete(user, id);

    return { success: true, message: 'Review deleted successfully' };
  }
}

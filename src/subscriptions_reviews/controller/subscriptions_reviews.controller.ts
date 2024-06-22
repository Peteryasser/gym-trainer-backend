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
} from '@nestjs/common';
import { SubscriptionsReviewsService } from '../service/subscriptions_reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { SubscriptionReview } from './subscription-review.entity';
import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@Controller('subscription_reviews')
@UseGuards(JwtAuthGuard)
export class SubscriptionReviewController {
  constructor(private readonly reviewService: SubscriptionsReviewsService) {}

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @GetUser() user: User,
  ): Promise<SubscriptionReview> {
    return this.reviewService.create(createReviewDto, user);
  }

  @Get()
  async getAll(): Promise<SubscriptionReview[]> {
    return this.reviewService.getAll();
  }

  @Get('coach/:id')
  async getByCoachId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubscriptionReview[]> {
    return this.reviewService.getByCoachId(id);
  }

  @Get('package/:id')
  async getByPackageId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubscriptionReview[]> {
    return this.reviewService.getByPackageId(id);
  }

  @Get('user')
  async getByUser(@GetUser() user: User): Promise<SubscriptionReview[]> {
    return this.reviewService.getByUser(user);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SubscriptionReview> {
    return await this.reviewService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ): Promise<SubscriptionReview> {
    return await this.reviewService.update(id, updateReviewDto, user);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<any> {
    await this.reviewService.delete(id, user);

    return { success: true, message: 'Review deleted successfully' };
  }
}

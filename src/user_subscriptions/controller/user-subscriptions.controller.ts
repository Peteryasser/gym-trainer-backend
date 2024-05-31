import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateSubscriptionDto } from '../dtos/create-subscription.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { UserSubscriptionsService } from '../service/user-subscriptions.service';
import { SubscriptionDto } from '../dtos/subscription.dto';
import { Coach } from '../../entity/coach.entity';
import { SubscriptionFilterDto } from '../dtos/subscription-filter.dto';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';

@UseGuards(JwtAuthGuard)
@Controller('user_subscriptions')
export class UserSubscriptionController {
  constructor(
    private readonly userSubscriptionService: UserSubscriptionsService,
  ) {}

  @Post()
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @GetUser() user: User,
  ): Promise<SubscriptionDto> {
    return this.userSubscriptionService.createSubscription(
      user,
      createSubscriptionDto,
    );
  }

  @Get()
  async getAll(
    @Query() filterDto: SubscriptionFilterDto,
    @GetUser() user: User | Coach,
  ): Promise<PaginatedResultDto<SubscriptionDto>> {
    console.log('filterrr ', filterDto);
    return this.userSubscriptionService.getAll(user, filterDto);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User | Coach,
  ): Promise<SubscriptionDto> {
    return this.userSubscriptionService.getById(id, user);
  }
}

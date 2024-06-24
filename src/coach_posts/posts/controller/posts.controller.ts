import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from '../service/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { CoachPost } from '../../../entity/coach-post.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Coach } from 'src/entity/coach.entity';
import { PaginatedResultDto } from 'src/dtos/paginatied-result.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('my_posts')
  findAll(
    @GetUser() user: Coach,
    @Body() filterDto: PaginationDto,
  ): Promise<PaginatedResultDto<CoachPost>> {
    return this.postService.findAll(user.id, filterDto);
  }

  @Get()
  findAllByCoach(
    @Body() filterDto: PaginationDto,
    @Query('coachId', ParseIntPipe) coachId: number,
  ): Promise<PaginatedResultDto<CoachPost>> {
    return this.postService.findAll(coachId, filterDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CoachPost> {
    return this.postService.findOne(id);
  }

  @Post()
  create(
    @GetUser() user: Coach,
    @Body() createCoachPostDto: CreatePostDto,
  ): Promise<CoachPost> {
    return this.postService.create(user, createCoachPostDto);
  }

  @Put(':id')
  update(
    @GetUser() user: Coach,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCoachPostDto: CreatePostDto,
  ): Promise<CoachPost> {
    return this.postService.update(user, id, updateCoachPostDto);
  }

  @Delete(':id')
  async delete(
    @GetUser() user: Coach,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.postService.delete(user, id);

    return { success: true, message: 'Post deleted successfully' };
  }
}

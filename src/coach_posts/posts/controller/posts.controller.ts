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

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get('my_posts')
  findAll(@GetUser() user: Coach): Promise<CoachPost[]> {
    return this.postService.findAll(user.id);
  }

  @Get()
  findAllByCoach(
    @Query('coachId', ParseIntPipe) coachId: number,
  ): Promise<CoachPost[]> {
    return this.postService.findAll(coachId);
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
  delete(
    @GetUser() user: Coach,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.postService.delete(user, id);
  }
}

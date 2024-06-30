import {
  Controller,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../../../auth/decorators/get-user.decorator';
import { User } from '../../../entity/user.entity';
import { PostLikesService } from '../service/posts_likes.service';
import { CoachPost } from '../../../entity/coach-post.entity';
import { JwtAuthGuard } from '../../../auth/guards/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('post_likes')
export class PostLikesController {
  constructor(private readonly postLikeService: PostLikesService) {}

  @Post(':id')
  create(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<CoachPost> {
    return this.postLikeService.create(id, user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<CoachPost> {
    return this.postLikeService.remove(id, user.id);
  }
}

import { Module } from '@nestjs/common';
import { PostsLikesService } from './posts_likes/posts_likes.service';
import { LikesController } from './likes/likes.controller';

@Module({
  providers: [PostsLikesService],
  controllers: [LikesController],
})
export class PostLikesModule {}

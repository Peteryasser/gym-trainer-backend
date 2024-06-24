import { Module } from '@nestjs/common';
import { PostLikesService } from './service/posts_likes.service';
import { PostLikesController } from './likes/likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachPostLike } from 'src/entity/coach-post-like.entity';
import { PostsService } from '../posts/service/posts.service';
import { CoachPost } from 'src/entity/coach-post.entity';
import { CoachPostMultimedia } from 'src/entity/coach-post-multimedia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoachPostLike, CoachPost, CoachPostMultimedia]),
  ],
  providers: [PostLikesService, PostsService],
  controllers: [PostLikesController],
})
export class PostLikesModule {}

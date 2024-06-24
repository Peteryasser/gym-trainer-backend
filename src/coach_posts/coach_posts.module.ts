import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PostLikesModule } from './likes/posts_likes.module';
import { PostMultimediaModule } from './multimedia/posts_multimedia.module';

@Module({})
export class CoachPostsModule {
  imports: [PostsModule, PostLikesModule, PostMultimediaModule];
}

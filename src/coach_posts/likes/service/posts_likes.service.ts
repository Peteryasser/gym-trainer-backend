import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoachPostLike } from '../../../entity/coach-post-like.entity';
import { CoachPost } from 'src/entity/coach-post.entity';
import { PostsService } from 'src/coach_posts/posts/service/posts.service';

@Injectable()
export class PostLikesService {
  constructor(
    @InjectRepository(CoachPostLike)
    private readonly postLikeRepository: Repository<CoachPostLike>,
    private readonly postService: PostsService,
    private readonly dataSource: DataSource,
  ) {}

  async create(postId: number, userId: number): Promise<CoachPost> {
    const like = this.postLikeRepository.create({ postId, userId });
    await this.postLikeRepository.save(like);

    await this.updatePostLikes(postId);

    return this.postService.findOne(postId);
  }

  async remove(postId: number, userId: number): Promise<CoachPost> {
    await this.postLikeRepository.delete({ postId, userId });
    await this.updatePostLikes(postId);

    return this.postService.findOne(postId);
  }

  private async updatePostLikes(postId: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const { likesNo } = await this.postLikeRepository
        .createQueryBuilder('postLike')
        .select('COUNT(postLike.id)', 'likesNo')
        .where('postLike.postId = :postId', { postId })
        .getRawOne();

      await queryRunner.manager.update(CoachPost, postId, { likesNo: likesNo });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}

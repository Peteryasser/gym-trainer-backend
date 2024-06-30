import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachPostMultimedia } from '../../../entity/coach-post-multimedia.entity';
import { CoachPost } from '../../../entity/coach-post.entity';
import { Coach } from '../../../entity/coach.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PaginatedResultDto } from '../../../dtos/paginatied-result.dto';
import { PaginationDto } from '../../../dtos/pagination.dto';
import { paginate } from '../../../utils/pagination/pagination.util';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(CoachPost)
    private coachPostRepository: Repository<CoachPost>,
    @InjectRepository(CoachPostMultimedia)
    private postMultimediaRepository: Repository<CoachPostMultimedia>,
  ) {}

  async findAll(
    id: number,
    filterDto?: PaginationDto,
  ): Promise<PaginatedResultDto<CoachPost>> {
    let query = this.coachPostRepository.createQueryBuilder('posts');

    query = query
      .leftJoinAndSelect('posts.multimedia', 'multimedia')
      .andWhere('posts.coachId = :coachId', { coachId: id });

    query = paginate(query, filterDto.page, filterDto.pageSize);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page: filterDto.page,
      pageSize: filterDto.pageSize,
    };
  }

  async findOne(id: number): Promise<CoachPost> {
    const post = await this.coachPostRepository.findOne({
      where: { id: id },
      relations: ['multimedia'],
    });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }
    return post;
  }

  async create(user: Coach, CreatePostDto: CreatePostDto): Promise<CoachPost> {
    const { multimedia, ...postDetails } = CreatePostDto;

    const post = this.coachPostRepository.create(postDetails);
    post.coachId = user.id;

    await this.coachPostRepository.save(post);

    if (multimedia) {
      const multimediaEntities = multimedia.map((item) =>
        this.postMultimediaRepository.create({ ...item, postId: post.id }),
      );
      await this.postMultimediaRepository.save(multimediaEntities);
    }
    return this.findOne(post.id);
  }

  async update(
    user: Coach,
    id: number,
    updateCoachPostDto: CreatePostDto,
  ): Promise<CoachPost> {
    const result = await this.coachPostRepository.update(
      {
        id: id,
        coachId: user.id,
      },
      updateCoachPostDto,
    );

    if (!result.affected) throw new NotFoundException('Post not found');

    return this.findOne(id);
  }

  async delete(user: Coach, id: number): Promise<void> {
    const result = await this.coachPostRepository.delete({
      id: id,
      coachId: user.id,
    });

    if (!result.affected) throw new NotFoundException('Post not found');
  }
}

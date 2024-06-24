import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachPostMultimedia } from 'src/entity/coach-post-multimedia.entity';
import { CoachPost } from 'src/entity/coach-post.entity';
import { Coach } from 'src/entity/coach.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(CoachPost)
    private coachPostRepository: Repository<CoachPost>,
    @InjectRepository(CoachPostMultimedia)
    private postMultimediaRepository: Repository<CoachPostMultimedia>,
  ) {}

  async findAll(id: number): Promise<CoachPost[]> {
    return this.coachPostRepository.find({
      where: { coach: { id: id } },
      relations: ['multimedia'],
    });
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
    post.coach = user;

    await this.coachPostRepository.save(post);

    const multimediaEntities = multimedia.map((item) =>
      this.postMultimediaRepository.create({ ...item, postId: post.id }),
    );
    await this.postMultimediaRepository.save(multimediaEntities);

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
        coach: user,
      },
      updateCoachPostDto,
    );

    if (!result.affected) throw new NotFoundException('Post not found');

    return this.findOne(id);
  }

  async delete(user: Coach, id: number): Promise<void> {
    const result = await this.coachPostRepository.delete({
      id: id,
      coach: user,
    });

    if (!result.affected) throw new NotFoundException('Post not found');
  }
}

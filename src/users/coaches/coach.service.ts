import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from 'src/entity/coach.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachRepository: Repository<Coach>,
  ) {}

  async create(coach: Coach): Promise<Coach> {
    return await this.coachRepository.save(coach);
  }

  async findOneById(
    id: number,
    throwException: boolean = true,
  ): Promise<Coach> {
    const user = await this.coachRepository.findOneBy({ id });

    if (!user && throwException) throw new NotFoundException('Coach not found');

    return user;
  }
}

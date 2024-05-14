import { Injectable } from '@nestjs/common';
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
}

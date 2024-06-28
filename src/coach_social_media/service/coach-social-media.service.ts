import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coach } from '../../entity/coach.entity';
import { CreateSocialMediaDto } from '../dtos/create-social-media.dto';
import { CoachSocialMedia } from '../../entity/coach-social-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSocialMediaDto } from '../dtos/update-social-media.dto';

@Injectable()
export class CoachSocialMediaService {
  constructor(
    @InjectRepository(CoachSocialMedia)
    private readonly socialMediaRepository: Repository<CoachSocialMedia>,
  ) {}
  async create(
    createSocialMediaDto: CreateSocialMediaDto,
    user: Coach,
  ): Promise<CoachSocialMedia> {
    const newAccount = new CoachSocialMedia();
    newAccount.handle = createSocialMediaDto.handle;
    newAccount.platform = createSocialMediaDto.platform;
    newAccount.coach = user;

    const savedAccount = await this.socialMediaRepository.save(newAccount);

    return await this.getById(savedAccount.id);
  }
  async getAll(user: Coach): Promise<CoachSocialMedia[]> {
    return this.getCoachAll(user.id);
  }

  async getCoachAll(coachId: number): Promise<CoachSocialMedia[]> {
    if (!coachId) throw new BadRequestException('Coach Id must be provided');

    return await this.socialMediaRepository.find({
      where: { coach: { id: coachId } },
    });
  }

  async getById(id: number): Promise<CoachSocialMedia> {
    if (!id)
      throw new BadRequestException('Social Media Account Id must be provided');

    const account = await this.socialMediaRepository.findOneBy({ id: id });

    return account;
  }
  async update(
    id: number,
    user: Coach,
    accountDto: UpdateSocialMediaDto,
  ): Promise<CoachSocialMedia> {
    const partialAccount: Partial<CoachSocialMedia> = accountDto;

    const result = await this.socialMediaRepository.update(
      { id: id, coach: user },
      partialAccount,
    );

    if (!result.affected)
      throw new NotFoundException('Social Media Account not found');

    return await this.getById(id);
  }
  async delete(id: number, user: Coach): Promise<void> {
    const result = await this.socialMediaRepository.delete({
      id: id,
      coach: user,
    });

    if (!result.affected)
      throw new NotFoundException('Social Media Account not found');
  }
}

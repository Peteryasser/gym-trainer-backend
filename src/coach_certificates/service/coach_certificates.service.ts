import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoachCertificate } from 'src/entity/coach-certificate.entity';
import { Coach } from 'src/entity/coach.entity';
import { Repository } from 'typeorm';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';

@Injectable()
export class CoachCertificateService {
  constructor(
    @InjectRepository(CoachCertificate)
    private readonly certificateRepository: Repository<CoachCertificate>,
  ) {}
  async create(
    createCertificateDto: CreateCertificateDto,
    user: Coach,
  ): Promise<CoachCertificate> {
    const newCertificate = new CoachCertificate();
    newCertificate.title = createCertificateDto.title;
    newCertificate.description = createCertificateDto.description;
    newCertificate.certificateUrl = createCertificateDto.certificateUrl;
    newCertificate.coach = user;

    const savedCertificate =
      await this.certificateRepository.save(newCertificate);

    return await this.getById(savedCertificate.id);
  }
  async getAll(user: Coach): Promise<CoachCertificate[]> {
    return this.getCoachAll(user.id);
  }

  async getCoachAll(coachId: number): Promise<CoachCertificate[]> {
    if (!coachId) throw new BadRequestException('Coach Id must be provided');

    return await this.certificateRepository.find({
      where: { coach: { id: coachId } },
    });
  }

  async getById(id: number): Promise<CoachCertificate> {
    if (!id) throw new BadRequestException('Certificate Id must be provided');

    const certificate = await this.certificateRepository.findOneBy({ id: id });

    return certificate;
  }
  async update(
    id: number,
    user: Coach,
    certificateDto: UpdateCertificateDto,
  ): Promise<CoachCertificate> {
    const partialCertificate: Partial<CoachCertificate> = certificateDto;

    const result = await this.certificateRepository.update(
      { id: id, coach: user },
      partialCertificate,
    );

    if (!result.affected) throw new NotFoundException('Certificate not found');

    return await this.getById(id);
  }
  async delete(id: number, user: Coach): Promise<void> {
    const result = await this.certificateRepository.delete({
      id: id,
      coach: user,
    });

    if (!result.affected) throw new NotFoundException('Certificate not found');
  }
}

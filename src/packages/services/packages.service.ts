import { Injectable, NotFoundException } from '@nestjs/common';
import { CoachesService } from '../../users/coaches/coach.service';
import { PackageDto } from '../dtos/package.dto';
import { Package } from '../../entity/coach-package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Coach } from '../../entity/coach.entity';
import { Repository } from 'typeorm';
import { PackageFilterDto } from '../dtos/package-filter.dto';
import { PackageEditDto } from '../dtos/package-edit.dto';
import { paginate } from '../../utils/pagination/pagination.util';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    private readonly coachesService: CoachesService,
  ) {}

  async create(user: Coach, packageDto: PackageDto): Promise<Package> {
    const pack = this.packageRepository.create(packageDto);
    pack.coach = user;

    await this.packageRepository.save(pack);
    return pack;
  }

  async getAll(
    user: Coach,
    filterDto: PackageFilterDto,
  ): Promise<PaginatedResultDto<Package>> {
    let query = this.packageRepository.createQueryBuilder('package');

    if (filterDto.sortBy)
      query = query.orderBy(
        `package.${filterDto.sortBy}`,
        filterDto.sortOrder || 'ASC',
      );

    if (filterDto.keyword)
      query = query.where('package.description ILIKE :keyword', {
        keyword: `%${filterDto.keyword}%`,
      });

    if (filterDto.minPrice)
      query = query.andWhere('package.price >= :minPrice', {
        minPrice: filterDto.minPrice,
      });

    if (filterDto.maxPrice)
      query = query.andWhere('package.price <= :maxPrice', {
        maxPrice: filterDto.maxPrice,
      });

    if (user)
      query = query.andWhere('package.coachId = :coachId', {
        coachId: user.id,
      });

    query = paginate(query, filterDto.page, filterDto.pageSize);

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      page: filterDto.page,
      pageSize: filterDto.pageSize,
    };
  }

  async getById(user: Coach, id: number): Promise<Package> {
    const pack = await this.packageRepository.findOneBy({
      id: id,
      coach: user,
    });
    if (!pack) throw new NotFoundException('Package not found');

    return pack;
  }

  async update(
    user: Coach,
    id: number,
    packDto: PackageEditDto,
  ): Promise<Package> {
    const partialPack: Partial<Package> = packDto;

    const result = await this.packageRepository.update(
      { id: id, coach: user },
      partialPack,
    );

    if (result.affected === 0) throw new NotFoundException('Package not found');

    return await this.getById(user, id);
  }

  async delete(user: Coach, id: number): Promise<void> {
    const result = await this.packageRepository.delete({ id: id, coach: user });

    if (result.affected === 0) throw new NotFoundException('Package not found');
  }
}

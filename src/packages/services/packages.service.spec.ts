import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackagesService } from './packages.service';
import { CoachesService } from '../../users/coaches/coach.service';
import { Package } from '../../entity/coach-package.entity';
import { Coach } from '../../entity/coach.entity';
import { PackageDto } from '../dtos/package.dto';
import { PackageFilterDto } from '../dtos/package-filter.dto';
import { PackageEditDto } from '../dtos/package-edit.dto';
import { DurationUnitEnum } from '../duration-unit.enum';

describe('PackagesService', () => {
  let service: PackagesService;
  let packageRepository: Repository<Package>;
  let coachesService: CoachesService;

  const mockPackageRepository = {
    create: jest.fn(),
    save: jest.fn(),
    createQueryBuilder: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockCoachesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PackagesService,
        {
          provide: getRepositoryToken(Package),
          useValue: mockPackageRepository,
        },
        { provide: CoachesService, useValue: mockCoachesService },
      ],
    }).compile();

    service = module.get<PackagesService>(PackagesService);
    packageRepository = module.get<Repository<Package>>(
      getRepositoryToken(Package),
    );
    coachesService = module.get<CoachesService>(CoachesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new package', async () => {
      const user: Coach = { id: 1 } as Coach;
      const packageDto: PackageDto = {
        price: 100,
        duration: 30,
        durationUnit: DurationUnitEnum.DAY,
        description: 'Test Package',
        hasNutrition: true,
      };

      const createdPackage = { ...packageDto, coach: user };
      mockPackageRepository.create.mockReturnValue(createdPackage);
      mockPackageRepository.save.mockResolvedValue(createdPackage);

      const result = await service.create(user, packageDto);
      expect(packageRepository.create).toHaveBeenCalledWith(packageDto);
      expect(packageRepository.save).toHaveBeenCalledWith(createdPackage);
      expect(result).toEqual(createdPackage);
    });

    describe('getAll', () => {
      it('should return a list of packages based on filter', async () => {
        const user: Coach = { id: 1 } as Coach;
        const filterDto: PackageFilterDto = {
          keyword: 'Test',
          minPrice: 50,
          page: 1,
          pageSize: 1,
        };

        const queryBuilder = {
          where: jest.fn().mockReturnThis(),
          andWhere: jest.fn().mockReturnThis(),
          orderBy: jest.fn().mockReturnThis(),
          getMany: jest.fn().mockResolvedValue([{}]),
        };

        mockPackageRepository.createQueryBuilder.mockReturnValue(queryBuilder);

        const result = await service.getAll(user, filterDto);
        expect(queryBuilder.getMany).toHaveBeenCalled();
        expect(result).toEqual([{}]);
      });
    });

    describe('getById', () => {
      it('should return the package if found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;
        const foundPackage = { id: packageId, coach: user };

        mockPackageRepository.findOneBy.mockResolvedValue(foundPackage);

        const result = await service.getById(packageId);
        expect(packageRepository.findOneBy).toHaveBeenCalledWith({
          id: packageId,
          coach: user,
        });
        expect(result).toEqual(foundPackage);
      });

      it('should throw NotFoundException if package not found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;

        mockPackageRepository.findOneBy.mockResolvedValue(null);

        await expect(service.getById(packageId)).rejects.toThrow(
          NotFoundException,
        );
      });
    });

    describe('update', () => {
      it('should update and return the package if found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;
        const packageEditDto: PackageEditDto = {
          price: 150,
          duration: 60,
          durationUnit: DurationUnitEnum.DAY,
          description: 'Updated Package',
          hasNutrition: false,
        };
        const foundPackage = { id: packageId, coach: user };

        mockPackageRepository.update.mockResolvedValue({ affected: 1 });
        mockPackageRepository.findOneBy.mockResolvedValue(foundPackage);

        const result = await service.update(user, packageId, packageEditDto);
        expect(packageRepository.update).toHaveBeenCalledWith(
          { id: packageId, coach: user },
          packageEditDto,
        );
        expect(result).toEqual(foundPackage);
      });

      it('should throw NotFoundException if package not found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;
        const packageEditDto: PackageEditDto = {
          description: 'Updated Package',
          price: 0,
          duration: 0,
          durationUnit: DurationUnitEnum.DAY,
          hasNutrition: false,
        };

        mockPackageRepository.update.mockResolvedValue({ affected: 0 });

        await expect(
          service.update(user, packageId, packageEditDto),
        ).rejects.toThrow(NotFoundException);
      });

      it('should throw an error if validation fails', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;
        const packageEditDto: any = {
          price: 'invalid',
          duration: 60,
          durationUnit: DurationUnitEnum.DAY,
          description: 'Updated Package',
          hasNutrition: false,
        };

        await expect(
          service.update(user, packageId, packageEditDto),
        ).rejects.toThrow();
      });
    });

    describe('delete', () => {
      it('should delete the package if found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;

        mockPackageRepository.delete.mockResolvedValue({ affected: 1 });

        await expect(service.delete(user, packageId)).resolves.not.toThrow();
        expect(packageRepository.delete).toHaveBeenCalledWith({
          id: packageId,
          coach: user,
        });
      });

      it('should throw NotFoundException if package not found', async () => {
        const user: Coach = { id: 1 } as Coach;
        const packageId = 1;

        mockPackageRepository.delete.mockResolvedValue({ affected: 0 });

        await expect(service.delete(user, packageId)).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});

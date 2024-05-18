import { Test, TestingModule } from '@nestjs/testing';
import { PackagesController } from './packages.controller';
import { PackagesService } from '../services/packages.service';
import { Coach } from '../../entity/coach.entity';
import { PackageDto } from '../dtos/package.dto';
import { Package } from '../../entity/coach-package.entity';
import { PackageFilterDto } from '../dtos/package-filter.dto';
import { PackageEditDto } from '../dtos/package-edit.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { DurationUnitEnum } from '../duration-unit.enum';
import { getMockCoach } from '../../auth/mocks/user.mock';

describe('PackagesController', () => {
  let controller: PackagesController;
  let service: PackagesService;

  const mockPackageService = {
    create: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUser: Coach = getMockCoach();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagesController],
      providers: [
        {
          provide: PackagesService,
          useValue: mockPackageService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<PackagesController>(PackagesController);
    service = module.get<PackagesService>(PackagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a package', async () => {
      const packageDto: PackageDto = {
        price: 100,
        duration: 30,
        durationUnit: DurationUnitEnum.DAY,
        description: 'Test Package',
        hasNutrition: true,
      };
      const result: Package = { ...packageDto, coach: mockUser } as Package;

      mockPackageService.create.mockResolvedValue(result);

      expect(await controller.create(mockUser, packageDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(mockUser, packageDto);
    });
  });

  describe('getAll', () => {
    it('should get all packages', async () => {
      const filterDto: PackageFilterDto = {};
      const result: Package[] = [
        { id: 1, description: 'Test Package' } as Package,
      ];

      mockPackageService.getAll.mockResolvedValue(result);

      expect(await controller.getAll(filterDto, mockUser)).toEqual(result);
      expect(service.getAll).toHaveBeenCalledWith(mockUser, filterDto);
    });
  });

  describe('getById', () => {
    it('should get a package by ID', async () => {
      const result: Package = { id: 1, description: 'Test Package' } as Package;

      mockPackageService.getById.mockResolvedValue(result);

      expect(await controller.getById(1, mockUser)).toEqual(result);
      expect(service.getById).toHaveBeenCalledWith(mockUser, 1);
    });
  });

  describe('update', () => {
    it('should update a package', async () => {
      const packageEditDto: PackageEditDto = {
        price: 120,
        duration: 45,
        durationUnit: DurationUnitEnum.WEEK,
        description: 'Updated Package',
        hasNutrition: false,
      };
      const result: Package = { ...packageEditDto, id: 1 } as Package;

      mockPackageService.update.mockResolvedValue(result);

      expect(await controller.update(1, mockUser, packageEditDto)).toEqual(
        result,
      );
      expect(service.update).toHaveBeenCalledWith(mockUser, 1, packageEditDto);
    });
  });

  describe('delete', () => {
    it('should delete a package', async () => {
      mockPackageService.delete.mockResolvedValue(null);

      expect(await controller.delete(1, mockUser)).toEqual({
        success: true,
        message: 'Package deleted successfully',
      });
      expect(service.delete).toHaveBeenCalledWith(mockUser, 1);
    });
  });
});

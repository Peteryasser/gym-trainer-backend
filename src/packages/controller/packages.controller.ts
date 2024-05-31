import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { PackagesService } from '../services/packages.service';
import { Coach } from '../../entity/coach.entity';
import { PackageDto } from '../dtos/package.dto';
import { Package } from '../../entity/coach-package.entity';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { PackageFilterDto } from '../dtos/package-filter.dto';
import { PackageEditDto } from '../dtos/package-edit.dto';
import { PaginatedResultDto } from '../../dtos/paginatied-result.dto';

@UseGuards(JwtAuthGuard)
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  async create(
    @GetUser() user: Coach,
    @Body() payload: PackageDto,
  ): Promise<Package> {
    return this.packagesService.create(user, payload);
  }

  @Get()
  async getAll(
    @Query() filterDto: PackageFilterDto,
    @GetUser() user: Coach,
  ): Promise<PaginatedResultDto<Package>> {
    return this.packagesService.getAll(user, filterDto);
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Package> {
    return this.packagesService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @GetUser() user: Coach,
    @Body() payload: PackageEditDto,
  ): Promise<Package> {
    return this.packagesService.update(user, id, payload);
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @GetUser() user: Coach): Promise<any> {
    await this.packagesService.delete(user, id);

    return { success: true, message: 'Package deleted successfully' };
  }
}

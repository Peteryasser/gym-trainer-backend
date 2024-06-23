import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CoachCertificateService } from '../service/coach_certificates.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Coach } from 'src/entity/coach.entity';
import { CreateCertificateDto } from '../dtos/create-certificate.dto';
import { UpdateCertificateDto } from '../dtos/update-certificate.dto';
import { CoachCertificate } from 'src/entity/coach-certificate.entity';

@UseGuards(JwtAuthGuard)
@Controller('coach_certificates')
export class CoachCertificateController {
  constructor(private readonly certificateService: CoachCertificateService) {}

  @Post()
  async create(
    @Body() createCertificateDto: CreateCertificateDto,
    @GetUser() user: Coach,
  ): Promise<CoachCertificate> {
    return this.certificateService.create(createCertificateDto, user);
  }

  @Get('my_certificates')
  async getAll(@GetUser() user: Coach): Promise<CoachCertificate[]> {
    return this.certificateService.getAll(user);
  }

  @Get()
  async getCoachAll(
    @Query('coachId', ParseIntPipe) coachId: number,
  ): Promise<CoachCertificate[]> {
    return this.certificateService.getCoachAll(coachId);
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoachCertificate> {
    return this.certificateService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Coach,
    @Body() accountDto: UpdateCertificateDto,
  ): Promise<CoachCertificate> {
    return this.certificateService.update(id, user, accountDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Coach,
  ): Promise<any> {
    await this.certificateService.delete(id, user);

    return { success: true, message: 'Certificate deleted successfully' };
  }
}

import { Module } from '@nestjs/common';
import { CoachCertificateController } from './controller/coach_certificates.controller';
import { CoachCertificateService } from './service/coach_certificates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachCertificate } from 'src/entity/coach-certificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CoachCertificate])],
  providers: [CoachCertificateService],
  controllers: [CoachCertificateController],
})
export class CoachCertificatesModule {}

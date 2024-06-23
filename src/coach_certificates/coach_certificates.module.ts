import { Module } from '@nestjs/common';
import { CoachCertificatesService } from './service/coach_certificates.service';
import { CoachCertificatesController } from './controller/coach_certificates.controller';

@Module({
  providers: [CoachCertificatesService],
  controllers: [CoachCertificatesController]
})
export class CoachCertificatesModule {}

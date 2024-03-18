import { Module } from '@nestjs/common';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TestCloudinaryService } from './test_cloudinary.service';

@Module({imports: [ CloudinaryModule ], providers: [TestCloudinaryService],})
export class TestCloudinaryModule {}

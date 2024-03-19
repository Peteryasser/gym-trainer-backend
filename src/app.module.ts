import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
// import { TestCloudinaryModule } from './test_cloudinary/test_cloudinary.module';
import typeorm from './config/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ExerciseService } from './exercise/exercise.service';
import { ImageService } from './image/image.service';

@Module({
  imports: [
    // CloudinaryModule ,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService, ExerciseService, ImageService],
})
export class AppModule {}

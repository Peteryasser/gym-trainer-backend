import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import typeorm from './config/typeorm';
import { ImageService } from './image/image.service';
import { WorkoutController } from './workout/workout.controller';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseService } from './exercise/exercise.service';
// import { Exercise } from './entity/exercise';
// import { Ingredient } from './entity/ingredient';
import { IngredientService } from './ingrediant/ingredient.service';
import { IngredientController } from './ingrediant/ingredient.controller';
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    CloudinaryModule,
    ExerciseModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController, WorkoutController, IngredientController],
  providers: [AppService, ImageService, ExerciseService, IngredientService],

})
export class AppModule {}

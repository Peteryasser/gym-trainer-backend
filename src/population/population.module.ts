import { Module } from '@nestjs/common';
import { PopulationController } from './controller/population.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import typeorm from 'src/config/typeorm';
import { IngredientController } from 'src/nutrition_side/ingredient/ingredient.controller';
import { IngredientService } from 'src/nutrition_side/ingredient/ingredient.service';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
import { ImageService } from 'src/utils/image/image.service';
import { ExerciseModule } from 'src/workout_side/exercise/exercise.module';
import { ExerciseService } from 'src/workout_side/exercise/exercise.service';
import { WorkoutController } from 'src/workout_side/workout/workout.controller';
import { AppService } from 'src/app.service';

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
    UsersModule,
  ],
  controllers: [PopulationController, WorkoutController, IngredientController],
  providers: [AppService, ImageService, ExerciseService, IngredientService],
})
export class PopulationModule {}

import { Module } from '@nestjs/common';
import { PopulationController } from './controller/population.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import typeorm from 'src/config/typeorm';
import { IngredientController } from 'src/nutrition_side/ingredient/ingredient.controller';
import { IngredientService } from 'src/nutrition_side/ingredient/ingredient.service';
import { RoutesController } from 'src/routes/routes.controller';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
import { ImageService } from 'src/utils/image/image.service';
import { ExerciseModule } from 'src/workout_side/exercise/exercise.module';
import { ExerciseService } from 'src/workout_side/exercise/exercise.service';
import { WorkoutController } from 'src/workout_side/workout/workout.controller';
import { AppService } from 'src/app.service';
import { CSVReaderService } from 'src/utils/Readers/csv_reader.service';
import { ExerciseController } from 'src/workout_side/exercise/exercise.controller';
import { WorkoutModule } from 'src/workout_side/workout/workout.module';
import { WorkoutService } from 'src/workout_side/workout/workout.service';
import { WorkoutHistoryModule } from 'src/workout_side/history/workoutHistory.module';
import { WorkoutHistoryController } from 'src/workout_side/history/workoutHistory.controller';
import { WorkoutHistoryService } from 'src/workout_side/history/workoutHistory.service';

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
    WorkoutModule,
    WorkoutHistoryModule,
  ],
  controllers: [
    PopulationController,
    WorkoutController,
    IngredientController,
    RoutesController,
    ExerciseController,
    WorkoutController,
    WorkoutHistoryController,
  ],
  providers: [
    AppService,
    ImageService,
    ExerciseService,
    IngredientService,
    CSVReaderService,
    WorkoutService,
    WorkoutHistoryService,
  ],
})
export class PopulationModule {}

import { Module } from '@nestjs/common';
import { PopulationController } from './controller/population.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
import typeorm from 'src/config/typeorm';

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
import { SaveModule } from 'src/workout_side/save/save.module';
import { SaveController } from 'src/workout_side/save/save.controller';
import { SaveService } from 'src/workout_side/save/save.service';
import { WorkoutCollectionModule } from 'src/workout_side/workout_collection/workoutcollection.module';
import { WorkoutCollectionController } from 'src/workout_side/workout_collection/workoutcollection.controller';
import { WorkoutCollectionService } from 'src/workout_side/workout_collection/workoutcollection.service';
import { WorkoutPlanModule } from 'src/workout_side/workout_plan/workoutplan.module';
import { WorkoutPlanController } from 'src/workout_side/workout_plan/workoutplan.controller';
import { WorkoutPlanService } from 'src/workout_side/workout_plan/workoutplan.service';
import { WorkoutPlanPackegeModule } from 'src/workout_side/workout-package/workoutpackage.module';
import { WorkoutPlanPackageController } from 'src/workout_side/workout-package/workoutpackage.controller';
import { WorkoutPlanPackageService } from 'src/workout_side/workout-package/workoutpackage.service';
import { ExerciseFilterModule } from 'src/workout_side/exercise/filter/filter.module';
import { ExerciseFilterController } from 'src/workout_side/exercise/filter/filter.controller';
import { ExerciseFilterService } from 'src/workout_side/exercise/filter/filter.service';
import { IngredientController } from 'src/nutrition_side/ingredient/ingredient.controller';
import { IngredientService } from 'src/nutrition_side/ingredient/ingredient.service';

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
    SaveModule,
    WorkoutCollectionModule,
    WorkoutPlanModule,
    WorkoutPlanPackegeModule,
    ExerciseFilterModule,
  ],
  controllers: [
    PopulationController,
    WorkoutController,
    IngredientController,
    ExerciseController,
    WorkoutController,
    WorkoutHistoryController,
    SaveController,
    WorkoutCollectionController,
    WorkoutPlanController,
    WorkoutPlanPackageController,
    ExerciseFilterController,
  ],
  providers: [
    AppService,
    ImageService,
    ExerciseService,
    IngredientService,
    CSVReaderService,
    WorkoutService,
    WorkoutHistoryService,
    SaveService,
    WorkoutCollectionService,
    WorkoutPlanService,
    WorkoutPlanPackageService,
    ExerciseFilterService,
  ],
})
export class PopulationModule {}

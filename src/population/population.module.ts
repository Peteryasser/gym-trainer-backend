import { Module } from '@nestjs/common';
import { PopulationController } from './controller/population.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from '../auth/auth.module';
import typeorm from '../config/typeorm';

import { UsersModule } from '../users/users.module';
import { CloudinaryModule } from '../utils/cloudinary/cloudinary.module';
import { ImageService } from '../utils/image/image.service';
import { ExerciseModule } from '../workout_side/exercise/exercise.module';
import { ExerciseService } from '../workout_side/exercise/exercise.service';
import { WorkoutController } from '../workout_side/workout/workout.controller';
import { AppService } from '../app.service';
import { CSVReaderService } from '../utils/Readers/csv_reader.service';
import { ExerciseController } from '../workout_side/exercise/exercise.controller';
import { WorkoutModule } from '../workout_side/workout/workout.module';
import { WorkoutService } from '../workout_side/workout/workout.service';
import { WorkoutHistoryModule } from '../workout_side/history/workoutHistory.module';
import { WorkoutHistoryController } from '../workout_side/history/workoutHistory.controller';
import { WorkoutHistoryService } from '../workout_side/history/workoutHistory.service';
import { SaveModule } from '../workout_side/save/save.module';
import { SaveController } from '../workout_side/save/save.controller';
import { SaveService } from '../workout_side/save/save.service';
import { WorkoutCollectionModule } from '../workout_side/workout_collection/workoutcollection.module';
import { WorkoutCollectionController } from '../workout_side/workout_collection/workoutcollection.controller';
import { WorkoutCollectionService } from '../workout_side/workout_collection/workoutcollection.service';
import { WorkoutPlanModule } from '../workout_side/workout_plan/workoutplan.module';
import { WorkoutPlanController } from '../workout_side/workout_plan/workoutplan.controller';
import { WorkoutPlanService } from '../workout_side/workout_plan/workoutplan.service';
import { WorkoutPlanPackegeModule } from '../workout_side/workout-package/workoutpackage.module';
import { WorkoutPlanPackageController } from '../workout_side/workout-package/workoutpackage.controller';
import { WorkoutPlanPackageService } from '../workout_side/workout-package/workoutpackage.service';
import { ExerciseFilterModule } from '../workout_side/exercise/filter/filter.module';
import { ExerciseFilterController } from '../workout_side/exercise/filter/filter.controller';
import { ExerciseFilterService } from '../workout_side/exercise/filter/filter.service';
// import { IngredientController } from '../nutrition_side/ingredient/ingredient.controller';
// import { IngredientService } from '../nutrition_side/ingredient/ingredient.service';

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
    // IngredientController,
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
    // IngredientService,
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

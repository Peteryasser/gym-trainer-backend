import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesController } from './routes/routes.controller';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import typeorm from './config/typeorm';
import { ImageService } from './utils/image/image.service';
import { WorkoutController } from './workout_side/workout/workout.controller';
import { ExerciseModule } from './workout_side/exercise/exercise.module';
import { ExerciseService } from './workout_side/exercise/exercise.service';
// import { Exercise } from './entity/exercise';
// import { Ingredient } from './entity/ingredient';
import { IngredientService } from './nutrition_side/ingredient/ingredient.service';
import { IngredientController } from './nutrition_side/ingredient/ingredient.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PopulationModule } from './population/population.module';
import { ExerciseController } from './workout_side/exercise/exercise.controller';
import { WorkoutModule } from './workout_side/workout/workout.module';
import { WorkoutService } from './workout_side/workout/workout.service';
import { WorkoutHistoryModule } from './workout_side/history/workoutHistory.module';
import { WorkoutHistoryController } from './workout_side/history/workoutHistory.controller';
import { WorkoutHistoryService } from './workout_side/history/workoutHistory.service';
import { SaveModule } from './workout_side/save/save.module';
import { SaveController } from './workout_side/save/save.controller';
import { SaveService } from './workout_side/save/save.service';
import { WorkoutCollectionModule } from './workout_side/workout_collection/workoutcollection.module';
import { WorkoutCollectionController } from './workout_side/workout_collection/workoutcollection.controller';
import { WorkoutCollectionService } from './workout_side/workout_collection/workoutcollection.service';
import { WorkoutPlanModule } from './workout_side/workout_plan/workoutplan.module';
import { WorkoutPlanController } from './workout_side/workout_plan/workoutplan.controller';
import { WorkoutPlanService } from './workout_side/workout_plan/workoutplan.service';
import { WorkoutPlanPackegeModule } from './workout_side/workout-package/workoutpackage.module';
import { WorkoutPlanPackageController } from './workout_side/workout-package/workoutpackage.controller';
import { WorkoutPlanPackageService } from './workout_side/workout-package/workoutpackage.service';
import { ExerciseFilterModule } from './workout_side/exercise/filter/filter.module';
import { ExerciseFilterController } from './workout_side/exercise/filter/filter.controller';
// import { Exercise } from './entity/exercise.entity';
import { ExerciseFilterService } from './workout_side/exercise/filter/filter.service';

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
    UsersModule,
    PopulationModule,
    WorkoutModule,
    WorkoutHistoryModule,
    SaveModule,
    WorkoutCollectionModule,
    WorkoutPlanModule,
    WorkoutPlanPackegeModule,
    ExerciseFilterModule,
  ],
  controllers: [
    AppController,
    WorkoutController,
    IngredientController,
    RoutesController,
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
    WorkoutService,
    WorkoutHistoryService,
    SaveService,
    WorkoutCollectionService,
    WorkoutPlanService,
    WorkoutPlanPackageService,
    ExerciseFilterService,
  ],
})
export class AppModule {}

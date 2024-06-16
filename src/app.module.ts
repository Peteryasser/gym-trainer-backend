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
  ],
  controllers: [
    AppController,
    WorkoutController,
    IngredientController,
    RoutesController,
    ExerciseController,
    WorkoutController,
  ],
  providers: [
    AppService,
    ImageService,
    ExerciseService,
    IngredientService,
    WorkoutService,
  ],
})
export class AppModule {}

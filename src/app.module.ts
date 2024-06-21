import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import typeorm from './config/typeorm';
import { ImageService } from './utils/image/image.service';
import { WorkoutController } from './workout_side/workout/workout.controller';
import { ExerciseModule } from './workout_side/exercise/exercise.module';
import { ExerciseService } from './workout_side/exercise/exercise.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PopulationModule } from './population/population.module';
import { PackagesModule } from './packages/packages.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { CoachesModule } from './users/coaches/coaches.module';
import { IngredientModule } from './nutrition_side/ingredient/ingredient.module';
import { RecipeModule } from './nutrition_side/recipe/recipe.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CoachSocialMediaModule } from './coach_social_media/coach_social_media.module';

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

    EventEmitterModule.forRoot(),

    CloudinaryModule,
    ExerciseModule,
    AuthModule,
    UsersModule,
    CoachesModule,
    PopulationModule,
    PackagesModule,
    UserSubscriptionsModule,
    IngredientModule,
    RecipeModule,
    NotificationsModule,
    CoachSocialMediaModule
  ],
  controllers: [
    AppController,
    WorkoutController,
    ],
  providers: [AppService, ImageService, ExerciseService ],
})
export class AppModule {}

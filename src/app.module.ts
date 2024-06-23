import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryModule } from './utils/cloudinary/cloudinary.module';
import typeorm from './config/typeorm';
import { ImageService } from './utils/image/image.service';
import { WorkoutController } from './workout_side/workout/workout.controller';
import { ExerciseModule } from './workout_side/exercise/exercise.module';
import { ExerciseService } from './workout_side/exercise/exercise.service';
import { IngredientService } from './nutrition_side/ingredient/ingredient.service';
import { IngredientController } from './nutrition_side/ingredient/ingredient.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PopulationModule } from './population/population.module';
import { PackagesModule } from './packages/packages.module';
import { UserSubscriptionsModule } from './user_subscriptions/user_subscriptions.module';
import { CoachesModule } from './users/coaches/coaches.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CoachSocialMediaModule } from './coach_social_media/coach_social_media.module';
import { CryptoModule } from './crypto/crypto.module';
import { ChatModule } from './chat/chat.module';
import { FirebaseService } from './firebase/firebase.service';
import { ChatController } from './chat/chat.controller';
import { CryptoController } from './crypto/controller/crypto.controller';
import { CryptoService } from './crypto/service/crypto.service';

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
    NotificationsModule,
    CoachSocialMediaModule,
    CryptoModule,
    ChatModule,
  ],
  controllers: [
    AppController,
    WorkoutController,
    IngredientController,
  ],
  providers: [
    AppService,
    ImageService,
    ExerciseService,
    IngredientService,
    FirebaseService,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { DevicesService } from '../users/service/devices.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from '../users/service/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { CoachesService } from '../users/coaches/coach.service';
import { Coach } from '../entity/coach.entity';
import { Device } from '../entity/device.entity';
import { User } from '../entity/user.entity';
import { CryptoService } from '../crypto/service/crypto.service';
import { UserKeys } from '../entity/user-keys.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Coach, Device, UserKeys,Device]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            ...(process.env.JWT_EXPIRY
              ? {
                  expiresIn: Number(process.env.JWT_EXPIRY),
                }
              : {}),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    UsersService,
    DevicesService,
    CoachesService,
    CryptoService,
  ],
  exports: [JwtModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

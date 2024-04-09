import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { jwtConstants } from './constants';
import { DevicesService } from 'src/users/service/devices.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/service/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { Device } from 'src/users/entities/device.entity';
import { CoachesService } from 'src/users/coaches/coach.service';
import { Coach } from 'src/users/coaches/coach.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, Coach, Device]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => {
        return {
          secret: jwtConstants.secret,
          signOptions: {
            ...(jwtConstants.expiry
              ? {
                  expiresIn: Number(jwtConstants.expiry),
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
  ],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

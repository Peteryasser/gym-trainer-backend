import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/service/users.service';
import { jwtConstants } from './constants';
import { User } from '../entity/user.entity';
import { DevicesService } from '../users/service/devices.service';
import { Device } from '../entity/device.entity';
import { CoachesService } from '../users/coaches/coach.service';
import { Coach } from '../entity/coach.entity';
import { UserType } from '../users/user-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly usersService: UsersService,
    private readonly coachesService: CoachesService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(
    payload: any,
  ): Promise<{ user: User | Coach; device: Device }> {
    let user: User | Coach;

    if (payload.userType === UserType.user)
      user = await this.usersService.findOneById(payload.userID, false);
    else if (payload.userType === UserType.coach)
      user = await this.coachesService.findOneById(payload.userID, false);

    if (!user) throw new UnauthorizedException('Invalid Token');

    const device = await this.devicesService.findOneById(payload.deviceID);
    if (!device) throw new UnauthorizedException('Invalid Token');

    return { user, device };
  }
}

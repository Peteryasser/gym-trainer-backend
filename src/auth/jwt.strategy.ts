import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/service/users.service';
import { jwtConstants } from './constants';
import { User } from 'src/entity/user.entity';
import { DevicesService } from 'src/users/service/devices.service';
import { Device } from 'src/entity/device.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<{ user: User; device: Device }> {
    const user = await this.usersService.findOneById(payload.userID);
    if (!user) throw new UnauthorizedException('Invalid Token');

    const device = await this.devicesService.findOneById(payload.deviceID);
    if (!device) throw new UnauthorizedException('Invalid Token');

    return { user, device };
  }
}

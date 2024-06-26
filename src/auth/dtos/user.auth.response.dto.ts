import { UserDto } from '../../users/dtos/user.dto';
import { UserKeysDto } from './user-keys.dto';

export class UserAuthResponseDto {
  user: UserDto;
  token: string;
  keys: UserKeysDto;

  constructor(token: string, user: UserDto, keys: any = null) {
    this.user = user;
    this.token = token;

    if (keys) this.keys = new UserKeysDto(keys.publicKey, keys.privateKey);
  }
}

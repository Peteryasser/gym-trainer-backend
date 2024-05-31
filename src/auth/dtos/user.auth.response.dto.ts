import { UserDto } from '../../users/dtos/user.dto';

export class UserAuthResponseDto {
  user: UserDto;
  token: string;

  constructor(token: string, user: UserDto) {
    this.user = user;
    this.token = token;
  }
}

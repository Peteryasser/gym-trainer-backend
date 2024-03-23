import { UUID } from 'crypto';
import { UserType } from '../../users/user-type.enum';

export type TokenPayload = {
  userID: UUID;
  userType: UserType;
};

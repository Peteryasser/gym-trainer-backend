import { UserType } from '../../users/user-type.enum';

export type TokenPayload = {
  userID: number;
  userType: UserType;
  deviceID: number;
};

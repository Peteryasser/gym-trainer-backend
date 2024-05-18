import { User } from '../../entity/user.entity';
import { Coach } from '../../entity/coach.entity';

export const getMockCoach = (): Coach => {
  return {
    id: 1,
  } as Coach;
};

export const getMockUser = (): User => {
  return {
    id: 1,
  } as User;
};

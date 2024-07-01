import { Coach } from '../entity/coach.entity';
import { User } from '../entity/user.entity';

export class WorkoutSideUtils {
  static async getTheUser(user: User | Coach) {
    let userToFunction;
    if (user instanceof Coach) {
      userToFunction = await user.user;
    } else {
      userToFunction = user;
    }

    return userToFunction;
  }
}

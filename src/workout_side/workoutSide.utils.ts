import { Coach } from 'src/entity/coach.entity';
import { User } from 'src/entity/user.entity';

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

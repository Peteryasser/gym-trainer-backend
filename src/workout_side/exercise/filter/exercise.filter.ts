import { SelectQueryBuilder } from 'typeorm';
import { Exercise } from '../../../entity/exercise.entity';
import { User } from '../../../entity/user.entity';

export interface ExerciseFilter {
  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise>;
}

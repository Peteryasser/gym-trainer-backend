import { SelectQueryBuilder } from 'typeorm';
import { Exercise } from 'src/entity/exercise.entity';
import { User } from 'src/entity/user.entity';

export interface ExerciseFilter {
  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise>;
}

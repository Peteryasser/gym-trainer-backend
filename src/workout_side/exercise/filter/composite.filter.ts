import { SelectQueryBuilder } from 'typeorm';
import { Exercise } from '../../../entity/exercise.entity';
import { ExerciseFilter } from './exercise.filter';
import { User } from '../../../entity/user.entity';

export class CompositeExerciseFilter implements ExerciseFilter {
  private filters: ExerciseFilter[] = [];

  addFilter(filter: ExerciseFilter): void {
    this.filters.push(filter);
  }

  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise> {
    return this.filters.reduce(
      (filteredQuery, filter) => filter.apply(filteredQuery, user),
      query,
    );
  }
}

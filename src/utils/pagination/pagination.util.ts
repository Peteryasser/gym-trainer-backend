import { SelectQueryBuilder } from 'typeorm';

export function paginate<T>(
  query: SelectQueryBuilder<T>,
  page: number,
  pageSize: number,
): SelectQueryBuilder<T> {
  const skip = (page - 1) * pageSize;
  return query.skip(skip).take(pageSize);
}

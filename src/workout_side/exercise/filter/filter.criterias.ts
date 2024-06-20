import { SelectQueryBuilder } from 'typeorm';
import { Exercise } from 'src/entity/exercise.entity';
import { ExerciseFilter } from './exercise.filter';
import { User } from 'src/entity/user.entity';

export class BodyPartFilter implements ExerciseFilter {
  constructor(private bodyPartIds: number[]) {}

  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise> {
    return query
      .andWhere('exercise.bodyPartId IN (:...bodyPartIds)', {
        bodyPartIds: this.bodyPartIds,
      })
      .andWhere(
        '(exercise.type = false OR (exercise.type = true AND exercise.userId = :userId))',
        { userId: user.id },
      );
  }
}

export class EquipmentFilter implements ExerciseFilter {
  constructor(private equipmentIds: number[]) {}

  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise> {
    return query
      .leftJoin('exercise.equipments', 'equipment')
      .andWhere('equipment.id IN (:...equipmentIds)', {
        equipmentIds: this.equipmentIds,
      })
      .andWhere(
        '(exercise.type = false OR (exercise.type = true AND exercise.userId = :userId))',
        { userId: user.id },
      );
  }
}

export class MuscleFilter implements ExerciseFilter {
  constructor(private muscleIds: number[]) {}

  apply(
    query: SelectQueryBuilder<Exercise>,
    user: User,
  ): SelectQueryBuilder<Exercise> {
    return query
      .leftJoin('exercise.targetMuscle', 'targetMuscle')
      .leftJoin('exercise.secondaryMuscles', 'secondaryMuscles')
      .andWhere(
        'targetMuscle.id IN (:...muscleIds) OR secondaryMuscles.id IN (:...muscleIds)',
        { muscleIds: this.muscleIds },
      )
      .andWhere(
        '(exercise.type = false OR (exercise.type = true AND exercise.userId = :userId))',
        { userId: user.id },
      );
  }
}

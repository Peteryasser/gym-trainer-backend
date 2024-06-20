import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/entity/exercise.entity';

import { BodyPartFilter } from './filter.criterias';
import { EquipmentFilter } from './filter.criterias';
import { MuscleFilter } from './filter.criterias';
import { CompositeExerciseFilter } from './composite.filter';
import { FilterExercisesDto } from './dtos/filter-exercise-dto';
import { ConnectionManager } from 'src/config/connection_manager';
import { User } from 'src/entity/user.entity';

@Injectable()
export class ExerciseFilterService {
  constructor() {}

  async getFilteredExercises(
    filterDto: FilterExercisesDto,
    user: User,
  ): Promise<Exercise[]> {
    const { bodyPartIds, equipmentIds, muscleIds } = filterDto;

    // can you change using repository by using connection like that
    const connection = await ConnectionManager.getConnection();
    const exerciseRepository = connection.getRepository(Exercise);

    const query = exerciseRepository
      .createQueryBuilder('exercise')
      .leftJoinAndSelect('exercise.bodyPart', 'bodyPart')
      .leftJoinAndSelect('exercise.equipments', 'equipments')
      .leftJoinAndSelect('exercise.targetMuscle', 'targetMuscle')
      .leftJoinAndSelect('exercise.secondaryMuscles', 'secondaryMuscles');

    const compositeFilter = new CompositeExerciseFilter();

    if (bodyPartIds) {
      compositeFilter.addFilter(new BodyPartFilter(bodyPartIds));
    }

    if (equipmentIds) {
      compositeFilter.addFilter(new EquipmentFilter(equipmentIds));
    }

    if (muscleIds) {
      compositeFilter.addFilter(new MuscleFilter(muscleIds));
    }

    const filteredQuery = compositeFilter.apply(query,user);

    const exercises = await filteredQuery.getMany();

    return exercises;
  }
}

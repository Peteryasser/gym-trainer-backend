import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../../../entity/exercise.entity';
import { BodyPart } from '../../../entity/bodyPart.entity';
import { Muscle } from '../../../entity/muscle.entity';
import { Equipment } from '../../../entity/equipment.entity';
import { ExerciseFilterService } from './filter.service';
import { ExerciseFilterController } from './filter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, BodyPart, Muscle, Equipment])],
  providers: [ExerciseFilterService],
  controllers: [ExerciseFilterController],
})
export class ExerciseFilterModule {}

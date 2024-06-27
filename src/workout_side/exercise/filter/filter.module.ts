import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/entity/exercise.entity';
import { BodyPart } from 'src/entity/bodyPart';
import { Muscle } from 'src/entity/muscle';
import { Equipment } from 'src/entity/equipment';
import { ExerciseFilterService } from './filter.service';
import { ExerciseFilterController } from './filter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, BodyPart, Muscle, Equipment])],
  providers: [ExerciseFilterService],
  controllers: [ExerciseFilterController],
})
export class ExerciseFilterModule {}

import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/entity/exercise.entity';
import { Equipment } from 'src/entity/equipment';
import { BodyPart } from 'src/entity/bodyPart';
import { Instruction } from 'src/entity/instruction';
import { Muscle } from 'src/entity/muscle';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExerciseController } from './exercise.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exercise,
      Equipment,
      BodyPart,
      Instruction,
      Muscle,
    ]),
  ],

  providers: [ExerciseService],
  controllers: [ExerciseController],
})
export class ExerciseModule {}

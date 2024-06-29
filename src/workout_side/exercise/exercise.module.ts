import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from '../../entity/exercise.entity';
import { Equipment } from '../../entity/equipment.entity';
import { BodyPart } from '../../entity/bodyPart.entity';
import { Instruction } from '../../entity/instruction.entity';
import { Muscle } from '../../entity/muscle.entity';
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

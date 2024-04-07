import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/entity/exercise';
import { Equipment } from 'src/entity/equipment';
import { BodyPart } from 'src/entity/bodyPart';
import { Instruction } from 'src/entity/instruction';
import { Muscle } from 'src/entity/muscle';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    
    imports: [TypeOrmModule.forFeature([
        Exercise,
        Equipment,
        BodyPart,
        Instruction,
        Muscle,
    ])],
    
    providers: [ExerciseService],
})
export class ExerciseModule {}

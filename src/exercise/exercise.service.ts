import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
import { connectionSource } from 'src/config/typeorm';
import { ConnectionManager } from 'src/connection/connection_manager';
import { ExerciseDTO } from 'src/dtos/exercise.dto';
import { BodyPart } from 'src/entity/bodyPart';
import { Equipment } from 'src/entity/equipment';
import { Exercise } from 'src/entity/exercise';
import { Instruction } from 'src/entity/instruction';
import { Muscle } from 'src/entity/muscle';
import { ExerciseCreationParams } from 'src/utils/types';
import { DataSource, Repository } from 'typeorm';

dotenvConfig({ path: '.env' });
@Injectable()
export class ExerciseService {
  private readonly apiUrl = 'https://exercisedb.p.rapidapi.com';
  constructor() {}
  async createExercise(dto: ExerciseDTO) {
    const exercise = new Exercise();
    exercise.idApi = dto.id;

    const bodyPart = new BodyPart();
    bodyPart.name = dto.bodyPart;
    exercise.bodyPart = bodyPart;

    const equipment = new Equipment();
    equipment.name = dto.equipment;
    exercise.equipments = [equipment];

    exercise.gifUrl = dto.gifUrl;

    const targetMuscle = new Muscle();
    targetMuscle.name = dto.target;
    exercise.targetMuscle = targetMuscle;

    const secondaryMuscles: Muscle[] = [];
    dto.secondaryMuscles.forEach(muscleName => {
        const secondaryMuscle = new Muscle();
        secondaryMuscle.name = muscleName;
        secondaryMuscles.push(secondaryMuscle);
    });
    exercise.secondaryMuscles = secondaryMuscles;

    exercise.instructions = dto.instructions.map((instruction, index) => {
        const mappedInstruction = new Instruction();
        mappedInstruction.description = instruction;
        mappedInstruction.order = index;
        return mappedInstruction;
    });

    const connection = await ConnectionManager.getConnection();
    try {
        await connection.manager.save(exercise); // Inserting a new record into the database
    } catch (e) {
        console.log(e);
    }
}

    
  async getBackExercises(): Promise<any> {
    const headers = {
      'X-Rapidapi-Key': `${process.env.X_Rapidapi_Key}`,
      'X-Rapidapi-Host': `${process.env.X_Rapidapi_Host}`,
    };

    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=1000`, { headers });
      return response.data;
    } catch (error) {
      // Handle error (e.g., log it or throw an exception)
      console.error('Error fetching back exercises:', error.message);
      throw new Error('Failed to fetch back exercises');
    }
  }



}

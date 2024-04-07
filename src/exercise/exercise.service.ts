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
  constructor(
    // @InjectRepository(Exercise)
    // private exerciseRepository: Repository<Exercise>,
  ) {}
  async createExercise(dto:ExerciseDTO){
    console.log("a");
    
    const exercise = new Exercise();
    console.log("b");

    // Assuming idApi is equivalent to id in ExerciseDTO
    exercise.idApi = dto.id;

    // Assuming you have the BodyPart, Equipment, and Muscle objects fetched based on provided data
    const bodyPart = new BodyPart();
    bodyPart.name = dto.bodyPart; // Assuming name in BodyPart is the relevant property
    exercise.bodyPart = bodyPart;

    const equipment = new Equipment();
    equipment.name = dto.equipment; // Assuming name in Equipment is the relevant property
    exercise.equipments = [equipment]; // Assuming equipments is an array

    exercise.gifUrl = dto.gifUrl;
    
    // Assuming targetMuscle is found based on provided data
    const targetMuscle = new Muscle();
    targetMuscle.name = dto.target; // Assuming name in Muscle is the relevant property
    exercise.targetMuscle = targetMuscle;

    // Assuming secondaryMuscles are found based on provided data
    const secondaryMuscles: Muscle[] = [];
    dto.secondaryMuscles.forEach(muscleName => {
        const secondaryMuscle = new Muscle();
        secondaryMuscle.name = muscleName; // Assuming name in Muscle is the relevant property
        secondaryMuscles.push(secondaryMuscle);
    });
    exercise.secondaryMuscles = secondaryMuscles;

    // Assuming instructions are directly mapped from DTO
    exercise.instructions = dto.instructions.map(instruction => {
        const mappedInstruction = new Instruction();
        mappedInstruction.description = instruction;
        return mappedInstruction;
    });

    const connection = await ConnectionManager.getConnection();

    console.log("c");
    try {
        await connection.manager.save(exercise);
    } catch (e) {
        console.log(e);
    }
    console.log(exercise)
    
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

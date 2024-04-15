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
  private readonly headers = {
    'X-Rapidapi-Key': `${process.env.X_Rapidapi_Key}`,
    'X-Rapidapi-Host': `${process.env.X_Rapidapi_Host}`,
  };


  private readonly apiUrl = 'https://exercisedb.p.rapidapi.com';
  constructor() {}
  // async createExercise(dto: ExerciseDTO) {
  //   const exercise = new Exercise();
  //   exercise.idApi = dto.id;

  //   const bodyPart = new BodyPart();
  //   bodyPart.name = dto.bodyPart;
  //   exercise.bodyPart = bodyPart;

  //   const equipment = new Equipment();
  //   equipment.name = dto.equipment;
  //   exercise.equipments = [equipment];

  //   exercise.gifUrl = dto.gifUrl;

  //   const targetMuscle = new Muscle();
  //   targetMuscle.name = dto.target;
  //   exercise.targetMuscle = targetMuscle;

  //   const secondaryMuscles: Muscle[] = [];
  //   dto.secondaryMuscles.forEach(muscleName => {
  //       const secondaryMuscle = new Muscle();
  //       secondaryMuscle.name = muscleName;
  //       secondaryMuscles.push(secondaryMuscle);
  //   });
  //   exercise.secondaryMuscles = secondaryMuscles;

  //   exercise.instructions = dto.instructions.map((instruction, index) => {
  //       const mappedInstruction = new Instruction();
  //       mappedInstruction.description = instruction;
  //       mappedInstruction.order = index;
  //       return mappedInstruction;
  //   });

  //   const connection = await ConnectionManager.getConnection();
  //   try {
  //       await connection.manager.save(exercise); // Inserting a new record into the database
  //   } catch (e) {
  //       console.log(e);
  //   }
  // }

  async createExercise(dto: ExerciseDTO) {
    const connection = await ConnectionManager.getConnection();
    
    const exercise = new Exercise();
    exercise.idApi = dto.id;

    // Check if BodyPart already exists
    let bodyPart = await connection.manager.findOne(BodyPart, {where:{ name: dto.bodyPart }});
    if (!bodyPart) {
        bodyPart = new BodyPart();
        bodyPart.name = dto.bodyPart;
    }
    exercise.bodyPart = bodyPart;

    // Check if Equipment already exists
    let equipment = await connection.manager.findOne(Equipment, {where:{ name: dto.equipment }});
    if (!equipment) {
        equipment = new Equipment();
        equipment.name = dto.equipment;
    }
    exercise.equipments = [equipment];

    exercise.gifUrl = dto.gifUrl;

    // Check if Target Muscle already exists
    let targetMuscle = await connection.manager.findOne(Muscle, {where:{ name: dto.target }});
    if (!targetMuscle) {
        targetMuscle = new Muscle();
        targetMuscle.name = dto.target;
    }
    exercise.targetMuscle = targetMuscle;

    // Check and create Secondary Muscles
    const secondaryMuscles: Muscle[] = [];
    for (const muscleName of dto.secondaryMuscles) {
        let secondaryMuscle = await connection.manager.findOne(Muscle, {where:{ name: muscleName }});
        if (!secondaryMuscle) {
            secondaryMuscle = new Muscle();
            secondaryMuscle.name = muscleName;
        }
        secondaryMuscles.push(secondaryMuscle);
    }
    exercise.secondaryMuscles = secondaryMuscles;

    // Map and save instructions
    exercise.instructions = dto.instructions.map((instruction, index) => {
        const mappedInstruction = new Instruction();
        mappedInstruction.description = instruction;
        mappedInstruction.order = index;
        return mappedInstruction;
    });

    // Save the exercise
    try {
        await connection.manager.save(exercise); // Inserting a new record into the database
    } catch (e) {
        console.log(e);
    }
}


    
  async getBackExercises(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=10`, { headers:this.headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching back exercises:', error.message);
      throw new Error('Failed to fetch back exercises');
    }
  }


  async getAllExercises(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=2000`, { headers:this.headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching all exercises:', error.message);
      throw new Error('Failed to fetch all exercises');
    }
  }


}

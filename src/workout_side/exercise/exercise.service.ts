import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';
import { ConnectionManager } from 'src/config/connection_manager';
import { ExerciseDTO } from 'src/workout_side/exercise/dtos/exercise.dto';
import { BodyPart } from 'src/entity/bodyPart';
import { Equipment } from 'src/entity/equipment';
import { Exercise } from 'src/entity/exercise.entity';
import { Instruction } from 'src/entity/instruction';
import { Muscle } from 'src/entity/muscle';
import { DTORequest } from './dtos/exercise_dto_request';
import { User } from 'src/entity/user.entity';

dotenvConfig({ path: '.env' });
@Injectable()
export class ExerciseService {
  constructor() {}

  private readonly headers = {
    'X-Rapidapi-Key': `${process.env.X_Rapidapi_Key}`,
    'X-Rapidapi-Host': `${process.env.X_Rapidapi_Host}`,
  };

  private readonly apiUrl = 'https://exercisedb.p.rapidapi.com';

  // async getFirstExercise(): Promise<Exercise> {
  //   const connection = await ConnectionManager.getConnection();
  //   return this.connection.manager.findOne(Exercise);
  // }

  async getExercisesByUser(user: User): Promise<Exercise[]> {
    const connection = await ConnectionManager.getConnection();
    
    console.log('Fetching exercises for user ID:', user.id);
    const exercises = await connection.manager.query(
      'SELECT * FROM exercises WHERE user_id = $1',
      [user.id]
    );
    // Find all exercises created by the user
    // const exercises = await connection.manager.find(Exercise, {
    //   where: { user: user },
    //   relations: [
    //     'bodyPart',
    //     'targetMuscle',
    //     'secondaryMuscles',
    //     'instructions',
    //     'equipments',
    //   ],
    // });

    return exercises;
  }

  async createNewExerciseByUser(dto: DTORequest, user: User) {
    const connection = await ConnectionManager.getConnection();
    const ex = new Exercise();
    ex.type = true;
    ex.user = user;

    ex.name = dto.name;
    ex.gifUrl = dto.gifUrl;
    ex.idApi = Math.random().toString(36).substring(7);

    // Check if BodyPart already exists
    let bodyPart = await connection.manager.findOne(BodyPart, {
      where: { name: dto.bodyPart },
    });
    if (!bodyPart) {
      bodyPart = new BodyPart();
      bodyPart.name = dto.bodyPart;
    }
    ex.bodyPart = bodyPart;

    // Check if Equipments already exists
    const equipments: Equipment[] = [];
    for (const equipmentName of dto.equipments) {
      let equipment = await connection.manager.findOne(Equipment, {
        where: { name: equipmentName },
      });
      if (!equipment) {
        equipment = new Equipment();
        equipment.name = equipmentName;
      }
      equipments.push(equipment);
    }
    ex.equipments = equipments;

    // Check if Target Muscle already exists
    let targetMuscle = await connection.manager.findOne(Muscle, {
      where: { name: dto.target },
    });
    if (!targetMuscle) {
      targetMuscle = new Muscle();
      targetMuscle.name = dto.target;
    }
    ex.targetMuscle = targetMuscle;

    // Check and create Secondary Muscles
    const secondaryMuscles: Muscle[] = [];
    for (const muscleName of dto.secondaryMuscles) {
      let secondaryMuscle = await connection.manager.findOne(Muscle, {
        where: { name: muscleName },
      });
      if (!secondaryMuscle) {
        secondaryMuscle = new Muscle();
        secondaryMuscle.name = muscleName;
      }
      secondaryMuscles.push(secondaryMuscle);
    }

    // Map and save instructions
    ex.instructions = dto.instructions.map((instruction, index) => {
      const mappedInstruction = new Instruction();
      mappedInstruction.description = instruction;
      mappedInstruction.order = index;
      return mappedInstruction;
    });

    // Save the exercise
    try {
      await connection.manager.save(ex); // Inserting a new record into the database
      console.log('Exercise created successfully');
    } catch (e) {
      console.log(e);
    }
    return ex;
  }

  async deleteExerciseByUser(id: number, user: User): Promise<void> {
    const connection = await ConnectionManager.getConnection();

    // Fetch the exercise to be deleted
    const exercises = await connection.manager.query(
      'SELECT * FROM exercises WHERE id = $1 AND user_id = $2',
      [id, user.id]
    );

    if (exercises.length === 0) {
      throw new NotFoundException('Exercise not found');
    }

    const exercise = exercises[0]; // Assuming id is unique, should ideally be fetched from findOne

    if (exercise.user_id !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to delete this exercise',
      );
    }

    // Delete the exercise
    await connection.manager.delete(Exercise, id);
  }

  async createExercise(dto: ExerciseDTO) {
    const connection = await ConnectionManager.getConnection();

    const exercise = new Exercise();
    exercise.idApi = dto.id;

    // Check if BodyPart already exists
    let bodyPart = await connection.manager.findOne(BodyPart, {
      where: { name: dto.bodyPart },
    });
    if (!bodyPart) {
      bodyPart = new BodyPart();
      bodyPart.name = dto.bodyPart;
    }
    exercise.bodyPart = bodyPart;

    // Check if Equipment already exists
    let equipment = await connection.manager.findOne(Equipment, {
      where: { name: dto.equipment },
    });
    if (!equipment) {
      equipment = new Equipment();
      equipment.name = dto.equipment;
    }
    exercise.equipments = [equipment];

    exercise.gifUrl = dto.gifUrl;

    // Check if Target Muscle already exists
    let targetMuscle = await connection.manager.findOne(Muscle, {
      where: { name: dto.target },
    });
    if (!targetMuscle) {
      targetMuscle = new Muscle();
      targetMuscle.name = dto.target;
    }
    exercise.targetMuscle = targetMuscle;

    // Check and create Secondary Muscles
    const secondaryMuscles: Muscle[] = [];
    for (const muscleName of dto.secondaryMuscles) {
      let secondaryMuscle = await connection.manager.findOne(Muscle, {
        where: { name: muscleName },
      });
      if (!secondaryMuscle) {
        secondaryMuscle = new Muscle();
        secondaryMuscle.name = muscleName;
      }
      secondaryMuscles.push(secondaryMuscle);
    }
    exercise.secondaryMuscles = secondaryMuscles;
    exercise.name = dto.name;
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

    return exercise;
  }

  async getBackExercises(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=10`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching back exercises:', error.message);
      throw new Error('Failed to fetch back exercises');
    }
  }

  async getAllExercises(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=2000`, {
        headers: this.headers,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all exercises:', error.message);
      throw new Error('Failed to fetch all exercises');
    }
  }
}

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

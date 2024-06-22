import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MoreThan } from 'typeorm';
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
import { UpdateExerciseDto } from './dtos/exercise_dto_update';

dotenvConfig({ path: '.env' });
@Injectable()
export class ExerciseService {
  constructor() {}

  private readonly headers = {
    'X-Rapidapi-Key': `${process.env.X_Rapidapi_Key}`,
    'X-Rapidapi-Host': `${process.env.X_Rapidapi_Host}`,
  };

  private readonly apiUrl = 'https://exercisedb.p.rapidapi.com';

  async getAllExercisesfromDB(user: User) {
    const connection = await ConnectionManager.getConnection();
    const exercises = await connection.manager.find(Exercise, {
      where: [{ type: false }, { type: true, user: { id: user.id } }],
      relations: [
        'bodyPart',
        'targetMuscle',
        'secondaryMuscles',
        'instructions',
        'equipments',
      ],
    });
    return exercises;
  }

  async getExercisesByUser(user: User): Promise<Exercise[]> {
    const connection = await ConnectionManager.getConnection();

    console.log('Fetching exercises for user ID:', user.id);

    const exercises = await connection.manager.find(Exercise, {
      where: { user: { id: user.id } },
      relations: [
        'bodyPart',
        'targetMuscle',
        'secondaryMuscles',
        'instructions',
        'equipments',
      ],
    });

    return exercises;
  }

  async createNewExerciseByUser(dto: DTORequest, user: User) {
    const connection = await ConnectionManager.getConnection();
    const ex = new Exercise();
    ex.type = true;
    ex.user = user;
    ex.name = dto.name;
    ex.gifUrl = dto.gifUrl;

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
    ex.secondaryMuscles = secondaryMuscles;

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
      return 'Exercise created successfully';
    } catch (e) {
      console.log(e);
    }
    return 'a problem happened';
  }

  async deleteExerciseByUser(id: number, user: User) {
    const connection = await ConnectionManager.getConnection();
    let message = '';

    // Fetch the exercise to be deleted
    const exercises = await connection.manager.query(
      'SELECT * FROM exercises WHERE id = $1 AND user_id = $2',
      [id, user.id],
    );

    if (exercises.length === 0) {
      message = 'Exercise not found';
      return message;
    }

    const exercise = exercises[0]; // Assuming id is unique, should ideally be fetched from findOne

    if (exercise.user_id !== user.id) {
      message = 'You are not authorized to delete this exercise';
      return message;
    }

    // Delete the exercise
    await connection.manager.delete(Exercise, id);
    message = 'Exercise deleted successfully';
    return message;
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

  async update(
    user: User,
    exerciseId: number,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<string> {
    console.log('Updating exercise with ID:', exerciseId);
    console.log('Update DTO:', updateExerciseDto);

    let message = '';

    const connection = await ConnectionManager.getConnection();
    const exerciseRepository = connection.getRepository(Exercise);
    const exercise = await exerciseRepository.findOne({
      where: { id: exerciseId, user: { id: user.id } },
      relations: [
        'bodyPart',
        'targetMuscle',
        'secondaryMuscles',
        'instructions',
        'equipments',
      ],
    });

    if (!exercise) {
      message = `Exercise with ID ${exerciseId} not found`;
      return message;
    }

    if (exercise.user && exercise.user.id !== user.id) {
      message = `User with ID ${user.id} is not authorized to update this exercise`;
      return message;
    }

    if (updateExerciseDto.name) {
      exercise.name = updateExerciseDto.name;
    }

    if (updateExerciseDto.gifUrl) {
      exercise.gifUrl = updateExerciseDto.gifUrl;
    }

    if (updateExerciseDto.bodyPart) {
      let bodyPart = await connection.manager.findOne(BodyPart, {
        where: { name: updateExerciseDto.bodyPart },
      });
      if (!bodyPart) {
        bodyPart = connection.manager.create(BodyPart, {
          name: updateExerciseDto.bodyPart,
        });
        await connection.manager.save(bodyPart);
      }
      exercise.bodyPart = bodyPart;
    }

    if (updateExerciseDto.target) {
      let targetMuscle = await connection.manager.findOne(Muscle, {
        where: { name: updateExerciseDto.target },
      });
      if (!targetMuscle) {
        targetMuscle = connection.manager.create(Muscle, {
          name: updateExerciseDto.target,
        });
        await connection.manager.save(targetMuscle);
      }
      exercise.targetMuscle = targetMuscle;
    }

    if (updateExerciseDto.secondaryMuscles) {
      // Clear existing secondary muscles
      exercise.secondaryMuscles = [];

      // Add new secondary muscles
      const secondaryMuscles: Muscle[] = [];
      for (const muscleName of updateExerciseDto.secondaryMuscles) {
        let secondaryMuscle = await connection.manager.findOne(Muscle, {
          where: { name: muscleName },
        });
        if (!secondaryMuscle) {
          secondaryMuscle = new Muscle();
          secondaryMuscle.name = muscleName;
          await connection.manager.save(secondaryMuscle);
        }
        secondaryMuscles.push(secondaryMuscle);
      }
      exercise.secondaryMuscles = secondaryMuscles;
    }

    if (updateExerciseDto.instructions) {
      // Clear existing instructions
      exercise.instructions = [];

      // Add new instructions
      exercise.instructions = updateExerciseDto.instructions.map(
        (instruction, index) => {
          const mappedInstruction = new Instruction();
          mappedInstruction.description = instruction;
          mappedInstruction.order = index;
          return mappedInstruction;
        },
      );
    }

    if (updateExerciseDto.equipments) {
      // Clear existing equipments
      exercise.equipments = [];

      // Add new equipments
      const updatedEquipments: Equipment[] = [];
      for (const equipmentName of updateExerciseDto.equipments) {
        let equipment = await connection.manager.findOne(Equipment, {
          where: { name: equipmentName },
        });
        if (!equipment) {
          equipment = new Equipment();
          equipment.name = equipmentName;
          await connection.manager.save(equipment);
        }
        updatedEquipments.push(equipment);
      }
      exercise.equipments = updatedEquipments;
    }

    await connection.manager.save(exercise);
    message = 'Exercise updated successfully';
    return message;
  }

  async getBodyParts(): Promise<BodyPart[]> {
    const connection = await ConnectionManager.getConnection();
    // get all distinct body part elements

    return connection.manager.find(BodyPart);
  }

  async getEquipments(): Promise<Equipment[]> {
    const connection = await ConnectionManager.getConnection();
    // get all distinct equipment elements
    return connection.manager.find(Equipment);
  }

  async getMuscles(): Promise<Muscle[]> {
    const connection = await ConnectionManager.getConnection();
    // get all distinct muscle elements
    return connection.manager.find(Muscle);
  }

  async getNewExerciseWithVersion(version: number): Promise<any[]> {
    // connet data base
    const connection = await ConnectionManager.getConnection();

    // get the highest value from the version column
    const maxVersion = await connection.manager.query(
      'SELECT MAX(version) FROM exercises',
    );

    if (maxVersion[0].max === version) {
      return [];
    }

    const exercises = await connection.manager.find(Exercise, {
      where: { version: MoreThan(version) },
      relations: [
        'bodyPart',
        'targetMuscle',
        'secondaryMuscles',
        'instructions',
        'equipments',
      ],
    });
    return exercises;
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

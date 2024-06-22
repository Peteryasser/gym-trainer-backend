import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from 'src/entity/exercise.entity';
// import { ExerciseDTO } from './dtos/exercise.dto';
import { UpdateExerciseDto } from './dtos/exercise_dto_update';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { DTORequest } from './dtos/exercise_dto_request';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { BodyPart } from 'src/entity/bodyPart';
import { Equipment } from 'src/entity/equipment';
import { Muscle } from 'src/entity/muscle';

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('create')
  async createExercise(
    @Body() dto: DTORequest,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('createExercise');
    return this.exerciseService.createNewExerciseByUser(dto, user);
  }

  @Delete('delete/:id')
  async deleteExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<String> {
    console.log('deleteExercise');
    return this.exerciseService.deleteExerciseByUser(id, user);
  }

  @Get('my-exercises')
  async getMyExercise(@GetUser() user: User): Promise<Exercise[]> {
    console.log('get exercises of the user with id', user.id);
    return this.exerciseService.getExercisesByUser(user);
  }

  @Patch('update/:id')
  async updateExercise(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() dto: UpdateExerciseDto,
  ): Promise<String> {
    console.log('updateExercise');
    return this.exerciseService.update(user, id, dto);
  }

  @Get('body-parts')
  async getBodyParts(): Promise<BodyPart[]> {
    console.log('getBodyParts');
    return this.exerciseService.getBodyParts();
  }

  @Get('equipments')
  async getEquipments(): Promise<Equipment[]> {
    console.log('getEquipments');
    return this.exerciseService.getEquipments();
  }

  @Get('muscles')
  async getMuscles(): Promise<Muscle[]> {
    console.log('getMuscles');
    return this.exerciseService.getMuscles();
  }

  @Get('all-exercises')
  async getAllExercises(@GetUser() user: User): Promise<Exercise[]> {
    console.log('getAllExercises');
    return this.exerciseService.getAllExercisesfromDB(user);
  }
}

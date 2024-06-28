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
import { Exercise } from '../../entity/exercise.entity';
// import { ExerciseDTO } from './dtos/exercise.dto';
import { UpdateExerciseDto } from './dtos/exercise_dto_update';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { DTORequest } from './dtos/exercise_dto_request';
import { User } from '../../entity/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { BodyPart } from '../../entity/bodyPart.entity';
import { Equipment } from '../../entity/equipment.entity';
import { Muscle } from '../../entity/muscle.entity';

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

  @Get('get-new-exercises-with-version/:version')
  async getNewExerciseWithVersion(
    @Param('version') version: number,
  ): Promise<any[]> {
    console.log('getNewExerciseWithVersion');
    return this.exerciseService.getNewExerciseWithVersion(version);
  }
}

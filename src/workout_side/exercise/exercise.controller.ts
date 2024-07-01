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
import { Coach } from '../../entity/coach.entity';
import { WorkoutSideUtils } from '../workoutSide.utils';

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('create')
  async createExercise(
    @Body() dto: DTORequest,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('createExercise');
    return this.exerciseService.createNewExerciseByUser(dto, getUser);
  }

  @Delete('delete/:id')
  async deleteExercise(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('deleteExercise');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.exerciseService.deleteExerciseByUser(id, getUser);
  }

  @Get('my-exercises')
  async getMyExercise(@GetUser() user: User | Coach): Promise<Exercise[]> {
    const getUser = await WorkoutSideUtils.getTheUser(user);
    console.log('get exercises of the user with id', getUser.id);
    return this.exerciseService.getExercisesByUser(getUser);
  }

  @Patch('update/:id')
  async updateExercise(
    @GetUser() user: User | Coach,
    @Param('id') id: number,
    @Body() dto: UpdateExerciseDto,
  ): Promise<string> {
    console.log('updateExercise');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.exerciseService.update(getUser, id, dto);
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
  async getAllExercises(@GetUser() user: User | Coach): Promise<Exercise[]> {
    console.log('getAllExercises');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.exerciseService.getAllExercisesfromDB(getUser);
  }

  @Get('get-new-exercises-with-version/:version')
  async getNewExerciseWithVersion(
    @Param('version') version: number,
  ): Promise<any[]> {
    console.log('getNewExerciseWithVersion');
    return this.exerciseService.getNewExerciseWithVersion(version);
  }
}

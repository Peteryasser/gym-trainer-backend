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

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post('create')
  async createExercise(
    @Body() dto: DTORequest,
    @GetUser() user: User,
  ): Promise<Exercise> {
    console.log('createExercise');
    return this.exerciseService.createNewExerciseByUser(dto, user);
  }

  @Delete('delete/:id')
  async deleteExercise(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('deleteExercise');
    await this.exerciseService.deleteExerciseByUser(id, user);
    return { message: 'Exercise deleted successfully' };
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
  ): Promise<Exercise> {
    console.log('updateExercise');
    return this.exerciseService.update(user, id, dto);
  }

  // @Get('test')
  // async test() {
  //   console.log('Testttttttttttttttttttt');
  // }

  // @Post('create')
  // async createExercise(@Body() dto: ExerciseDTO): Promise<Exercise> {

  //   console.log('createExercise');
  //   return this.exerciseService.createExercise(dto);
  // }

  // @Get('first')
  // async getFirstExercise(): Promise<Exercise> {
  //   console.log('getFirstExercise');
  //   return this.exerciseService.getBackExercises();
  // }
}

import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { WorkoutCollectionService } from './workoutcollection.service';
import { WorkoutCollectionDto } from './dtos/workout_collection_dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { WorkoutCollection } from 'src/entity/workout-collection';
import { WorkoutCollectionUpdateDto } from './dtos/workout_collection_update_dto';

@Controller('workout-collection')
@UseGuards(JwtAuthGuard)
export class WorkoutCollectionController {
  constructor(
    private readonly workutCollectionService: WorkoutCollectionService,
  ) {}

  @Get('get-deault-collections-info')
  async test(): Promise<WorkoutCollection[]> {
    // return 'WorkoutCollectionController test';
    return this.workutCollectionService.getDeaultCollectionsInfo();
  }

  @Get('get-collection/:id')
  async getCollection(@Param('id') id: number): Promise<WorkoutCollection> {
    return this.workutCollectionService.getCollection(id);
  }

  @Post('create')
  async createWorkoutCollection(
    @Body() createWorkoutCollectionDto: WorkoutCollectionDto,
    @GetUser() user: User,
  ): Promise<string> {
    console.log('createWorkoutCollection');
    console.log('createWorkoutCollectionDto', createWorkoutCollectionDto);
    console.log('user', user);

    const message = this.workutCollectionService.createWorkoutCollection(
      user,
      createWorkoutCollectionDto,
    );
    return message;
  }

  @Delete('delete/:id')
  async deleteWorkoutCollection(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<string> {
    console.log('deleteWorkoutCollection');
    console.log('id', id);
    console.log('user', user);

    const message = this.workutCollectionService.deleteWorkoutCollection(
      user,
      id,
    );
    return message;
  }

  @Get('get-my-collections')
  async getMyCollections(@GetUser() user: User): Promise<WorkoutCollection[]> {
    console.log('getMyCollections');
    console.log('user', user);

    return this.workutCollectionService.getMyCollections(user);
  }

  @Get('get-default-collections')
  async getDefaultCollections(): Promise<WorkoutCollection[]> {
    console.log('getDefaultCollections');

    return this.workutCollectionService.getDefaultCollections();
  }

  @Patch('update/:id')
  async updateWorkoutCollection(
    @Param('id') id: number,
    @Body() updateWorkoutCollectionDto: WorkoutCollectionUpdateDto,
    @GetUser() user: User,
  ): Promise<string> {
    console.log('updateWorkoutCollection');
    console.log('id', id);
    console.log('updateWorkoutCollectionDto', updateWorkoutCollectionDto);
    console.log('user', user);

    const message = this.workutCollectionService.updateWorkoutCollection(
      user,
      id,
      updateWorkoutCollectionDto,
    );
    return message;
  }
}

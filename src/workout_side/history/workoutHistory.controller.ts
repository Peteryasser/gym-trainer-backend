import { WorkoutHistoryService } from './workoutHistory.service';
import { Controller, Param, Post, Body, Get, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { WorkoutHistoryDTO } from './dtos/workoutHistory_dto';
import { WorkoutHistory } from '../../entity/user-workout-history.entity';
import { WorkoutSideUtils } from '../workoutSide.utils';
import { Coach } from '../../entity/coach.entity';

@Controller('workout-history')
@UseGuards(JwtAuthGuard)
export class WorkoutHistoryController {
  constructor(private readonly workouthistoryservice: WorkoutHistoryService) {}

  @Post('add/:id')
  async addWorkoutHistory(
    @Param('id') workout_id: number,
    @Body() dto: WorkoutHistoryDTO,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('addWorkoutHistory');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workouthistoryservice.addWorkoutHistory(
      dto,
      getUser,
      workout_id,
    );
  }

  @Get('getHistory')
  async getMyHistory(@GetUser() user: User | Coach): Promise<WorkoutHistory[]> {
    console.log('getMyHistory');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workouthistoryservice.getMyHistory(getUser);
  }

  @Delete('delete/:id')
  async deleteWorkoutHistory(
    @Param('id') id: number,
    @GetUser() user: User | Coach,
  ): Promise<string> {
    console.log('deleteWorkoutHistory');
    const getUser = await WorkoutSideUtils.getTheUser(user);
    return this.workouthistoryservice.deleteWorkoutHistory(id, getUser);
  }
}

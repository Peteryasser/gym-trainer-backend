import { WorkoutHistoryService } from './workoutHistory.service';
import { Controller, Param, Post, Body, Get, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { WorkoutHistoryDTO } from './dtos/workoutHistory_dto';
import { WorkoutHistory } from 'src/entity/user-workout-history';

@Controller('workout-history')
@UseGuards(JwtAuthGuard)
export class WorkoutHistoryController {
  constructor(private readonly workouthistoryservice: WorkoutHistoryService) {}

  @Post('add/:id')
  async addWorkoutHistory(
    @Param('id') workout_id: number,
    @Body() dto: WorkoutHistoryDTO,
    @GetUser() user: User,
  ): Promise<WorkoutHistory> {
    console.log('addWorkoutHistory');
    return this.workouthistoryservice.addWorkoutHistory(dto, user, workout_id);
  }

  @Get('getHistory')
  async getMyHistory(@GetUser() user: User): Promise<WorkoutHistory[]> {
    console.log('getMyHistory');
    return this.workouthistoryservice.getMyHistory(user);
  }

  @Delete('delete/:id')
  async deleteWorkoutHistory(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log('deleteWorkoutHistory');
    await this.workouthistoryservice.deleteWorkoutHistory(id, user);
    return { message: 'Workout History deleted successfully' };
  }
}

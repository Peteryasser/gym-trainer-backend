import { Controller, Body, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { WorkoutPlanPackageService } from './workoutpackage.service';
import { WorkoutPlanPackageDTO } from './dtos/workout_package_dto';

@Controller('workoutplan-package')
@UseGuards(JwtAuthGuard)
export class WorkoutPlanPackageController {
  constructor(
    private readonly workoutPlanPackageService: WorkoutPlanPackageService,
  ) {}

  @Post('add')
  addWorkoutPlanToPackage(
    @Body() workoutPlanPackageDto: WorkoutPlanPackageDTO,
    @GetUser() user: User,
  ) {
    console.log('Add Workout Plan to Package ');
    console.log('workoutPlanPackageDto', workoutPlanPackageDto);

    return this.workoutPlanPackageService.addWorkoutPlanToPackage(
      workoutPlanPackageDto,
      user,
    );
  }
}

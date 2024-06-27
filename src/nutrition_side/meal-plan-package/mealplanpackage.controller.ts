import { Body, Controller, Delete, Param, Post, UseGuards, Get, Put, Patch } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { MealPlanPackageService } from './mealplanpackage.service';
import { MealPlanPackageDTO } from './dtos/create-mealplanpackage.dto';
import { Coach } from 'src/entity/coach.entity';
import { User } from 'src/entity/user.entity';
import { UserPackageMealPlans } from 'src/entity/user_package_meal_plans.entity';


@Controller('meal-plan-package')
@UseGuards(JwtAuthGuard)
export class MealPlanPackageController {

  constructor(
    private readonly mealPlanPackageService: MealPlanPackageService
   
  ){}

  @Post('add')
    async addMealPlanToPackage(
        @Body() mealPlanPackageDto: MealPlanPackageDTO,
        @GetUser() user: Coach,
    ):Promise<UserPackageMealPlans> {

    return this.mealPlanPackageService.addMealPlanToPackage(
        mealPlanPackageDto,
      user,
    );
  }

    @Delete('delete/:id')
    async deleteMealPlan(@Param('id') id: number, @GetUser() user: Coach) {
        return this.mealPlanPackageService.deleteMealPlanfromPackage(
        id,
        user,
        );
    }
    @Get('get-my-meal-plans-in-package')
    async getMyMealPlansInPackage(@GetUser() user: User) {
        return this.mealPlanPackageService.getMyMealPlansInPackage(user);
    }

    @Get('get-meal-plan-in-package/:id')
    async getMealPlanInPackage(@Param('id') id: number) {
        return this.mealPlanPackageService.getMealPlanInPackage(id);
    }

    @Put('update/:id')
    async updateMealPlanInPackage(
        @Param('id') id: number,
        @Body() mealPackageUpdateDTO: MealPlanPackageDTO,
        @GetUser() user: Coach,
    ) {
        return this.mealPlanPackageService.updateMealPlanInPackage(
        id,
        mealPackageUpdateDTO,
        user,
        );
    }



  
  
}
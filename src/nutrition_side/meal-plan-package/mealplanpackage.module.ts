import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealPlans } from 'src/entity/meal_plans.entity';
import { MealPlanPackageService } from './mealplanpackage.service';
import { MealPlanPackageController } from './mealplanpackage.controller';
import { Package } from 'src/entity/coach-package.entity';
import { User } from 'src/entity/user.entity';
import { UserPackageMealPlans } from 'src/entity/user_package_meal_plans.entity';





@Module({
  imports: [TypeOrmModule.forFeature([MealPlans,Package,User,UserPackageMealPlans])],
  providers: [MealPlanPackageService],
  controllers: [MealPlanPackageController],
})
export class MealPlanPackageModule { }
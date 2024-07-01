import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealPlans } from '../../entity/meal_plans.entity';
import { MealPlanPackageService } from './mealplanpackage.service';
import { MealPlanPackageController } from './mealplanpackage.controller';
import { Package } from '../../entity/coach-package.entity';
import { User } from '../../entity/user.entity';
import { UserPackageMealPlans } from '../../entity/user_package_meal_plans.entity';





@Module({
  imports: [TypeOrmModule.forFeature([MealPlans,Package,User,UserPackageMealPlans])],
  providers: [MealPlanPackageService],
  controllers: [MealPlanPackageController],
})
export class MealPlanPackageModule { }
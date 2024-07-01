import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlanController } from './meal_plan.controller';
import { MealPlanService } from './meal_plan.service';
import { Meals } from '../../entity/meals.entity';
import { MealPlans } from '../../entity/meal_plans.entity';
import { MealPlanMeals } from '../../entity/meal_plan_meals.entity';
import { UserPackageMealPlans } from '../../entity/user_package_meal_plans.entity';
import { UserSubscription } from '../../entity/user-subscription.entity';





@Module({
  imports: [TypeOrmModule.forFeature([Meals,MealPlans,MealPlanMeals,UserPackageMealPlans,UserSubscription])],
  providers: [MealPlanService],
  controllers: [MealPlanController],
})
export class MealPlanModule { }
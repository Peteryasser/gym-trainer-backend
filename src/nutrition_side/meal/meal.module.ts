import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meals } from '../../entity/meals.entity';
import { User } from '../../entity/user.entity';
import { MealCategories } from '../../entity/meal_categories.entity';
import { Recipes } from '../../entity/recipes.entity';
import { MealRecipes } from '../../entity/meal_recipes.entity';
import { SavedMeals } from '../../entity/saved_meals.entity';
import { UserMealsHistory } from '../../entity/user_meals_history.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Meals,User,MealCategories,Recipes,MealRecipes,SavedMeals,UserMealsHistory])],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule { }
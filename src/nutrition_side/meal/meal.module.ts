import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { Meals } from 'src/entity/meals.entity';
import { User } from 'src/entity/user.entity';
import { MealCategories } from 'src/entity/meal_categories.entity';
import { Recipes } from 'src/entity/recipes.entity';
import { MealRecipes } from 'src/entity/meal_recipes.entity';
import { SavedMeals } from 'src/entity/saved_meals.entity';
import { UserMealsHistory } from 'src/entity/user_meals_history.entity';




@Module({
  imports: [TypeOrmModule.forFeature([Meals,User,MealCategories,Recipes,MealRecipes,SavedMeals,UserMealsHistory])],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule { }
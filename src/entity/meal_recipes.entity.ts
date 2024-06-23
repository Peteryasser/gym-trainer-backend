import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meals } from './meals.entity';
import { Recipes } from './recipes.entity';

@Entity()
export class MealRecipes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meals, meal => meal.mealRecipes)
  meal: Meals;

  @ManyToOne(() => Recipes, recipe => recipe.mealRecipes)
  recipe: Recipes;
}

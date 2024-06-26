import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { MealCategories } from './meal_categories.entity';
import { User } from './user.entity';
import { MealRecipes } from './meal_recipes.entity';
import { SavedMeals } from './saved_meals.entity';
import { MealPlanMeals } from './meal_plan_meals.entity';
import { UserMealsHistory } from './user_meals_history.entity';

@Entity()
export class Meals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  name: string;

  @Column()
  description: string;

  @Column()
  is_custom: boolean;

  @ManyToOne(() => User, user => user.meals)
  user: User;

  @ManyToOne(() => MealCategories, category => category.meals)
  category: MealCategories;

  @Column()
  total_calories: number;

  @OneToMany(() => MealRecipes, mealRecipe => mealRecipe.meal)
  mealRecipes: MealRecipes[];

  @OneToMany(() => SavedMeals, savedMeal => savedMeal.meal)
  savedMeals: SavedMeals[];

  @OneToMany(() => MealPlanMeals, mealPlanMeal => mealPlanMeal.meal)
  mealPlanMeals: MealPlanMeals[];

  @OneToMany(() => UserMealsHistory, mealsHistory => mealsHistory.meal)
  mealsHistory: UserMealsHistory[];
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MealPlans } from './meal_plans.entity';
import { Meals } from './meals.entity';

@Entity()
export class MealPlanMeals {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MealPlans, mealPlan => mealPlan.mealPlanMeals)
  mealPlan: MealPlans;

  @ManyToOne(() => Meals, meal => meal.mealPlanMeals)
  meal: Meals;
}
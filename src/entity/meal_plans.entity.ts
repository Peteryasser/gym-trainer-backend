import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MealPlanMeals } from './meal_plan_meals.entity';


@Entity()
export class MealPlans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  description: string;

  @OneToMany(() => MealPlanMeals, mealPlanMeal => mealPlanMeal.mealPlan)
  mealPlanMeals: MealPlanMeals[];

  
}
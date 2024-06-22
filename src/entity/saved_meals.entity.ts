import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Meals } from './meals.entity';

@Entity()
export class SavedMeals {
  @PrimaryGeneratedColumn()
  meal_id: number;

  @ManyToOne(() => User, user => user.savedMeals)
  user: User;

  @ManyToOne(() => Meals, meal => meal.savedMeals)
  meal: Meals;
}

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Meals } from './meals.entity';

@Entity()
export class UserMealsHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.mealsHistory)
  user: User;

  @ManyToOne(() => Meals, meal => meal.mealsHistory)
  meal: Meals;

  @Column()
  date: Date;
}

import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Meals } from './meals.entity';

@Entity()
export class MealCategories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Meals, meal => meal.category)
  meals: Meals[];
}

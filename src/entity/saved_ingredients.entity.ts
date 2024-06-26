import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Ingredient } from './ingredients.entity';

@Entity()
export class SavedIngredients {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.savedIngredients)
  user: User;

  @ManyToOne(() => Ingredient, ingredient => ingredient.savedIngredients)
  ingredient: Ingredient;
}

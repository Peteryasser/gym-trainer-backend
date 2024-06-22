import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Recipes } from './recipes.entity';

@Entity()
export class SavedRecipes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.savedRecipes)
  user: User;

  @ManyToOne(() => Recipes, recipe => recipe.savedRecipes)
  recipe: Recipes;
}

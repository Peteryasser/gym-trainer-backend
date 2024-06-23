import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Recipes } from './recipes.entity';
import { Ingredient } from './ingredients.entity';

@Entity()
export class RecipesIngredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float4')
  amount: number;

  @Column()
  unit: string;

  @ManyToOne(() => Recipes, recipe => recipe.recipeIngredients)
  recipe: Recipes;

  @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients)
  ingredient: Ingredient;
}

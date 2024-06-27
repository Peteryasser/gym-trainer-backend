import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipes } from './recipes.entity';


@Entity('recipe-extentedIngredient')
export class RecipeExtentedIngredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredients: string;

  @OneToMany(() => Recipes, recipe => recipe.dishType)
  recipes: Recipes[];
}

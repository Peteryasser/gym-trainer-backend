import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DishTypes } from './dish_types.entity';
import { Cuisines } from './cuisines.entity';
import { User } from './user.entity';
import { RecipesIngredients } from './recipes_ingredients.entity';
import { SavedRecipes } from './saved_recipes.entity';
import { MealRecipes } from './meal_recipes.entity';
import { RecipeExtentedIngredients } from './recipe-extentedIngredient.entity';

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  name: string;

  @Column({nullable: true})
  imageURL: string;

  @Column('float4')
  calories_kcal: number;

  @Column('float4')
  fat_g: number;

  @Column('float4')
  sugar_g: number;

  @Column('float4')
  protein_g: number;

  @Column()
  instructions: string;

  @Column()
  summary: string;

  @Column()
  is_custom: boolean;

  @Column({nullable: true})
  readyInMinutes: number;

  @Column()
  servings: number;

  @ManyToOne(() => User, (user) => user.recipes, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => DishTypes, dishType => dishType.recipes)
  dishType: DishTypes;

  @ManyToOne(() => RecipeExtentedIngredients, { cascade: true, nullable: true })
  @JoinColumn()
  extentedIngredients: RecipeExtentedIngredients;

  @ManyToOne(() => Cuisines, cuisine => cuisine.recipes)
  cuisine: Cuisines;

  @OneToMany(() => RecipesIngredients, recipeIngredient => recipeIngredient.recipe)
  recipeIngredients: RecipesIngredients[];

  @OneToMany(() => SavedRecipes, savedRecipe => savedRecipe.recipe)
  savedRecipes: SavedRecipes[];

  @OneToMany(() => MealRecipes, mealRecipe => mealRecipe.recipe)
  mealRecipes: MealRecipes[];
}

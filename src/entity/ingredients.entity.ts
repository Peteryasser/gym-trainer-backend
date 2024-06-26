import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { IngredientCategory } from './ingredient_categories.entity';
import { RecipesIngredients } from './recipes_ingredients.entity';
import { SavedIngredients } from './saved_ingredients.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float4',{nullable: true})
  calories: number;

  @Column({ name: 'fat_total_g', type: 'float4',nullable: true })
  fat: number;

  @Column({ name: 'fat_saturated_g', type: 'float4',nullable: true })
  fatSaturated: number;

  @Column({ name: 'protein_g', type: 'float4',nullable: true })
  protein: number;

  @Column({ name: 'sodium_mg', type: 'float4',nullable: true })
  sodium: number;

  @Column({ name: 'potassium_mg', type: 'float4',nullable: true })
  potassium: number;

  @Column({ name: 'cholesterol_mg', type: 'float4',nullable: true })
  cholesterol: number;

  @Column({ name: 'carbohydrates_total_g', type: 'float4',nullable: true })
  carbohydrates: number;

  @Column({ name: 'fiber_g', type: 'float4',nullable: true })
  fiber: number;

  @Column({ name: 'sugar_g', type: 'float4',nullable: true })
  sugar: number;

  @Column({ nullable: true })
  imageURL: string;

  @ManyToOne(() => IngredientCategory, { cascade: true })
  @JoinColumn()
  category: IngredientCategory;

  @OneToMany(() => RecipesIngredients, recipeIngredient => recipeIngredient.ingredient)
  recipeIngredients: RecipesIngredients[];

  @OneToMany(() => SavedIngredients, savedIngredient => savedIngredient.ingredient)
  savedIngredients: SavedIngredients[];
}

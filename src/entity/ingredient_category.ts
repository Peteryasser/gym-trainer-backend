import { Entity, PrimaryGeneratedColumn, Column  , OneToMany} from 'typeorm';
import { Ingredient } from './ingredient';

@Entity('ingredient_category')
export class IngredientCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Ingredient, Ingredient => Ingredient.category)
  ingredients: Ingredient[];
}



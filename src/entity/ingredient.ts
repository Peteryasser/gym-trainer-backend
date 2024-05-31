import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IngredientCategory } from './ingredient_category';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  calories: number;

  @Column({ name: 'serving_size_g' })
  servingSize: number;

  @Column({ name: 'fat_total_g' })
  fatTotal: number;

  @Column({ name: 'fat_saturated_g' })
  fatSaturated: number;

  @Column({ name: 'protein_g' })
  protein: number;

  @Column({ name: 'sodium_mg' })
  sodium: number;

  @Column({ name: 'potassium_mg' })
  potassium: number;

  @Column({ name: 'cholesterol_mg' })
  cholesterol: number;

  @Column({ name: 'carbohydrates_total_g' })
  carbohydratesTotal: number;

  @Column({ name: 'fiber_g' })
  fiber: number;

  @Column({ name: 'sugar_g' })
  sugar: number;

  @Column({ nullable: true })
  imageURL: string;

  @ManyToOne(() => IngredientCategory, { cascade: true })
  @JoinColumn()
  category: IngredientCategory;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IngredientCategory } from './ingredient_category';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => IngredientCategory)
  @JoinColumn({ name: 'category_id' })
  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  caloriesUnit: string;

  @Column({ nullable: true })
  carbs: number;

  @Column({ nullable: true })
  carbsUnit: string;

  @Column({ nullable: true })
  protein: number;

  @Column({ nullable: true })
  proteinUnit: string;

  @Column({ nullable: true })
  fat: number;

  @Column({ nullable: true })
  fatUnit: string;

  @Column({ nullable: true })
  sugar: number;

  @Column({ nullable: true })
  sugarUnit: string;

  @Column({ nullable: true })
  calcium: number;

  @Column({ nullable: true })
  calciumUnit: string;

  @Column({ nullable: true })
  sodium: number;

  @Column({ nullable: true })
  sodiumUnit: string;

  @Column({ name: 'vitamin_c', nullable: true })
  vitaminC: number;

  @Column({ name: 'vitamin_c_unit', nullable: true })
  vitaminCUnit: string;

  @Column({ nullable: true })
  fiber: number;

  @Column({ nullable: true })
  fiberUnit: string;

  @Column({ nullable: true })
  potassium: number;

  @Column({ nullable: true })
  potassiumUnit: string;

  @Column({ nullable: true })
  water: number;

  @Column({ nullable: true })
  waterUnit: string;

  @Column({ name: 'saturated_fat', nullable: true })
  saturatedFat: number;

  @Column({ name: 'saturated_fat_unit', nullable: true })
  saturatedFatUnit: string;

  @Column({ name: 'mono_saturated_fat', nullable: true })
  monoSaturatedFat: number;

  @Column({ name: 'mono_saturated_fat_unit', nullable: true })
  monoSaturatedFatUnit: string;

  @Column({ name: 'poly_saturated_fat', nullable: true })
  polySaturatedFat: number;

  @Column({ name: 'poly_saturated_fat_unit', nullable: true })
  polySaturatedFatUnit: string;

  @Column({ nullable: true })
  cholesterol: number;

  @Column({ nullable: true })
  cholesterolUnit: string;
}

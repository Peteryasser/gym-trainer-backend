import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Ingredient_category')
export class IngredientCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;
}

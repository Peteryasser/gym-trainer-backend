import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Recipes } from './recipes.entity';

@Entity()
export class Cuisines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Recipes, recipe => recipe.cuisine)
  recipes: Recipes[];
}

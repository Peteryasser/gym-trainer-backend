import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MealPlans } from './meal_plans.entity';
import { User } from './user.entity';
import { Package } from './coach-package.entity';

@Entity()
export class UserPackageMealPlans {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MealPlans, mealPlan => mealPlan.userPackageMealPlans)
  mealPlan: MealPlans;

  @ManyToOne(() => User, user => user.userPackageMealPlans)
  user: User;

  @ManyToOne(
    () => Package,
    (packageEntity) => packageEntity.userPackageMealPlans,
    { nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'package_id' })
  package: Package;
}

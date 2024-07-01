import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { MealPlanMeals } from './meal_plan_meals.entity';
import { UserPackageMealPlans } from './user_package_meal_plans.entity';
import { User } from './user.entity';


@Entity()
export class MealPlans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.mealPlans, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => MealPlanMeals, mealPlanMeal => mealPlanMeal.mealPlan)
  mealPlanMeals: MealPlanMeals[];


  @OneToMany(() => UserPackageMealPlans, userPackageMealPlan => userPackageMealPlan.mealPlan)
  userPackageMealPlans: UserPackageMealPlans[];
  
}
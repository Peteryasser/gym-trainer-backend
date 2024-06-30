import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meals } from '../../entity/meals.entity';
import { MealPlanDto } from './dtos/create-meal.dto';
import { MealPlans } from '../../entity/meal_plans.entity';
import { MealPlanMeals } from '../../entity/meal_plan_meals.entity';
import { Coach } from 'src/entity/coach.entity';
import { UserPackageMealPlans } from 'src/entity/user_package_meal_plans.entity';

@Injectable()
export class MealPlanService {
  constructor(
    @InjectRepository(Meals)
    private readonly mealsRepository: Repository<Meals>,
    @InjectRepository(MealPlanMeals)
    private readonly mealPlanMealsRepository: Repository<MealPlanMeals>,
    @InjectRepository(MealPlans)
    private readonly mealPlansRepository: Repository<MealPlans>,
    @InjectRepository(UserPackageMealPlans)
    private readonly userPackageMealPlansRepository: Repository<UserPackageMealPlans>,
  ) {}

  async createMealPlan(mealPlanDto: MealPlanDto, user: User): Promise<MealPlans> {

    for (const mealId of mealPlanDto.meal_ids) {
      const meal = await this.mealsRepository.findOne(
        {
          where: { id: mealId },
          relations: ['user'],
        },
      );


      if (!meal) {
        throw new NotFoundException(`Meal with id ${mealId} not found`);
        
      }
      
    }

    const mealPlan = this.mealPlansRepository.create( {
      name: mealPlanDto.name,
      description: mealPlanDto.description,
      start_date: mealPlanDto.startDate,
      end_date: mealPlanDto.endDate,
      user: user,
    });

    await this.mealPlansRepository.save(mealPlan);

    for (const mealId of mealPlanDto.meal_ids) {
      const meal = await this.mealsRepository.findOne(
        {
          where: { id: mealId },
          relations: ['user'],
        },
      );


      const mealPlanMeals = this.mealPlanMealsRepository.create( {
        mealPlan,
        meal,
      });

      await this.mealPlanMealsRepository.save(mealPlanMeals);
    }

    return mealPlan;
  }

  async deleteMealPlan(id: number, user: User) {
    let message = '';

    const mealPlan = await this.mealPlansRepository.findOne({
        where: { id },
        relations: ['user'],
    });

    if (!mealPlan) {
        message = `Meal Plan with id ${id} not found`;
        return message;
    }

    if (mealPlan.user.id !== user.id) {
        message = `You are not authorized to delete meal plan with id ${id}`;
        return message;
    }

    const mealPlanMeals = await this.mealPlanMealsRepository.find({
        where: { mealPlan: { id: mealPlan.id } },
    });

    for (const mealPlanMeal of mealPlanMeals) {
        await this.mealPlanMealsRepository.delete(mealPlanMeal.id);
    }

    await this.mealPlansRepository.delete(mealPlan.id);

    message = 'Meal Plan and associated records deleted successfully';

    return message;
}

  async getMyPlans(user: User) {

    const mealPlans = await this.mealPlansRepository.find( {
      where: { user: { id: user.id } },
      relations: [
        'mealPlanMeals','mealPlanMeals.meal','mealPlanMeals.meal.mealRecipes'
      ],
    });

    return mealPlans;
  }

  async getUserPlansByCoach(id: number,user: Coach){
    const userPackageMealPlan = await this.userPackageMealPlansRepository.findOne({
      where: {
        user: { id: id },
        package: { coach: user },
      },
      relations: ['package', 'package.coach', 'mealPlan'],
    });

    if (!userPackageMealPlan) {
      throw new UnauthorizedException('You are not authorized to access this user’s data');
    }

    const mealPlans = await this.mealPlansRepository.find({
      where: {
        user: { id: id },
        userPackageMealPlans: {
          package: { coach: user},
        },
      },
      relations: ['mealPlanMeals','mealPlanMeals.meal','mealPlanMeals.meal.mealRecipes'],
    });

    return mealPlans;

  }

  async updateMealPlan(
    id: number,
    mealPlanUpdateDto: MealPlanDto,
    user: User,
  ):Promise<MealPlans> {

    const mealPlan = await this.mealPlansRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!mealPlan) {
      throw new NotFoundException(`meal Plan with id ${id} not found`);
      
    }
    await this.deleteMealPlan(id,user);
    return await this.createMealPlan(mealPlanUpdateDto,user);
    
  }

}
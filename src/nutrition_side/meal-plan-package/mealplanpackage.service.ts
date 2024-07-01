import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealPlans } from '../../entity/meal_plans.entity';
import { MealPlanPackageDTO } from './dtos/create-mealplanpackage.dto';
import { Coach } from '../../entity/coach.entity';
import { Package } from '../../entity/coach-package.entity';
import { UserPackageMealPlans } from '../../entity/user_package_meal_plans.entity';

@Injectable()
export class MealPlanPackageService {
  constructor(
    
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserPackageMealPlans)
    private readonly userPackageMealPlansRepository: Repository<UserPackageMealPlans>,
    @InjectRepository(MealPlans)
    private readonly mealPlansRepository: Repository<MealPlans>,
  ) {}

  async addMealPlanToPackage(
    mealPlanPackageDto: MealPlanPackageDTO,
    user: Coach,
  ):Promise<UserPackageMealPlans> {
    const trainee = await this.userRepository.findOne({
      where: { id: mealPlanPackageDto.trainee_id },
    });

    if (!trainee) {
      throw new NotFoundException(`Trainee with id ${mealPlanPackageDto.trainee_id} not found`);
    }

    const coachPackage = await this.packageRepository.findOne({
      where: { id: mealPlanPackageDto.package_id },
      relations: ['coach'],
    });

    if (!coachPackage) {
      throw new NotFoundException(`Package with id ${mealPlanPackageDto.package_id} not found`);
    }

    if ((await coachPackage.coach).id !== user.id) {
      throw new UnauthorizedException(`You are not authorized to add Meal plan to package with id ${mealPlanPackageDto.package_id}`);
    }

    const mealPlan = await this.mealPlansRepository.findOne( {
      where: { id: mealPlanPackageDto.meal_plan_id },
      relations: ['user'],
    });

    if (!mealPlan) {
      throw new NotFoundException(`Meal Plan with id ${mealPlanPackageDto.meal_plan_id} not found`);
    }

    let userPackageMealPlan = new UserPackageMealPlans();
    userPackageMealPlan.user = trainee;
    userPackageMealPlan.mealPlan = mealPlan;
    userPackageMealPlan.package = coachPackage;


    return await this.userPackageMealPlansRepository.save(userPackageMealPlan);

    
  }

  async deleteMealPlanfromPackage(id: number, user: Coach) {
    let message = '';

    const userPackageMealPlan = await this.userPackageMealPlansRepository.findOne(
      {
        where: { id },
        relations: ['package', 'package.coach'],
      },
    );


    if (!userPackageMealPlan) {
      message = `Meal Plan with id ${id} not found in user's packages`;
      return message;
    }

    if (userPackageMealPlan.package.coach.id !== user.id) {
      message = `You are not authorized to delete Meal plan with id ${id}`;
      return message;
    }

    await this.userPackageMealPlansRepository.delete(userPackageMealPlan);
    message = 'Meal Plan deleted successfully';
    return message;
  }

  async getMyMealPlansInPackage(user: User) {

    const userPackageMealPlans = await this.userPackageMealPlansRepository.find(
      {
        where: { user: { id: user.id } },
        relations: [
          'mealPlan',
          'mealPlan.mealPlanMeals','mealPlan.mealPlanMeals.meal','mealPlan.mealPlanMeals.meal.mealRecipes','mealPlan.mealPlanMeals.meal.mealRecipes.recipe'
        ],
      },
    );

    return userPackageMealPlans;
  }

  async getMealPlanInPackage(id: number):Promise<UserPackageMealPlans> {

    const userPackageMealPlan = await this.userPackageMealPlansRepository.findOne(
      {
        where: { id },
        relations: [
          'mealPlan',
          'mealPlan.mealPlanMeals','mealPlan.mealPlanMeals.meal','mealPlan.mealPlanMeals.meal.mealRecipes','mealPlan.mealPlanMeals.meal.mealRecipes.recipe'
        ],
      },
    );

    if (!userPackageMealPlan) {
      throw new NotFoundException(`Meal Plan with id ${id} not found in user's packages`);
    }

    return userPackageMealPlan;
  }

  async updateMealPlanInPackage(
    id: number,
    mealPackageUpdateDTO: MealPlanPackageDTO,
    user: Coach,
  ) {
    
    const userPackageMealPlan = await this.userPackageMealPlansRepository.findOne(
      {
        where: { id },
        relations: ['package', 'package.coach'],
      },
    );

    if (!userPackageMealPlan) {
      throw new NotFoundException(`meal Plan with id ${id} not found`);
      
    }

    await this.deleteMealPlanfromPackage(id,user);
    return await this.addMealPlanToPackage(mealPackageUpdateDTO,user);
  }

}
import { Injectable } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meals } from 'src/entity/meals.entity';
import { MealPlanDto } from './dtos/create-meal.dto';
import { MealPlans } from 'src/entity/meal_plans.entity';

@Injectable()
export class MealPlanService {
  constructor(
    @InjectRepository(Meals)
    private readonly mealsRepository: Repository<Meals>,
    @InjectRepository(MealPlans)
    private readonly mealPlansRepository: Repository<MealPlans>,
  ) {}

  
}
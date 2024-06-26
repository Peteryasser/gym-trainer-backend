import { Body, Controller, Delete, Param, Post, UseGuards, Get, Put } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { MealPlans } from 'src/entity/meal_plans.entity';
import { User } from 'src/entity/user.entity';
import { MealPlanDto } from './dtos/create-meal.dto';
import { MealPlanService } from './meal_plan.service';


@Controller('meal-plan')
@UseGuards(JwtAuthGuard)
export class MealPlanController {

  constructor(
    private readonly mealPlanService: MealPlanService
   
  ){}

 
  
  
}
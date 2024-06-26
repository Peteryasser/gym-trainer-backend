import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealPlanController } from './meal_plan.controller';
import { MealPlanService } from './meal_plan.service';





@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [MealPlanService],
  controllers: [MealPlanController],
})
export class MealModule { }
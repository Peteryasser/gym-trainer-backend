import { Controller, Get, Res, Param, Query,Post, UseGuards, Delete, Body, Patch, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meals } from '../../entity/meals.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { CreateMealDto } from './dtos/create-meal.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { UserMealsHistory } from '../../entity/user_meals_history.entity';
import { getHistoryNutritionsDto } from './dtos/get-history-data.dto';
import { MealNutritionsDto } from './dtos/history-nutrition.dto';
import { Coach } from '../../entity/coach.entity';




@Controller('meal')
export class MealController { 


    constructor(private readonly mealService: MealService) {
    
    }

    @Get('get-all-meals-while-installing')
    async getAllrecipes():Promise<Meals[]>{
        try{
            return await this.mealService.getAllMeals()
        }catch{
            throw new Error("Error while loading meals");;
        }
    }

    @Post('create-meal')
    async create(
        @Body() createMealDto: CreateMealDto,
    ):Promise<Meals> {
        try{
            return await this.mealService.create(createMealDto,null);
        }catch(error){
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-custom-meal')
    async createCustom(
        @Body() createMealDto: CreateMealDto,
        @GetUser() user: User|Coach,
    ):Promise<Meals> {
        if(user instanceof Coach){
            user= await user.user
          }
        try{
            return await this.mealService.create(createMealDto,user);
        }catch(error){
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-all-meals')
    async getAll():Promise<Meals[]>{
        try{
            return await this.mealService.getAllMeals()
        }catch{
            throw new Error("Error while loading meals");;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('save/:id')
    async saveMeal(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        if(user instanceof Coach){
            user= await user.user
          }
        await this.mealService.saveMeal(id, user);
        return { message: 'Meal saved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsave/:id')
    async unsaveMeal(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        if(user instanceof Coach){
            user= await user.user
          }
        await this.mealService.unSaveMeal(id, user);
        return { message: 'Meal unsaved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-saved-meals')
    async getAllSaved(@GetUser() user: User|Coach):Promise<Meals[]>{
        if(user instanceof Coach){
            user= await user.user
          }
        return this.mealService.getAllSaved(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-meal/:id')
    async getRecipe(
        @Param('id') id: number,
    ): Promise<Meals> {
        return await this.mealService.getMeal(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteMeal(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<String> {
        if(user instanceof Coach){
            user= await user.user
          }
        console.log('delete Meal');
        return this.mealService.deleteMeal(user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-my-meals')
    async getAllByUser(@GetUser() user: User|Coach):Promise<Meals[]>{
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            return await this.mealService.getAllByUser(user)
        }catch{
            throw new Error("Error while loading meals");
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
        @Body() updateRecipeDto: CreateMealDto
        ):Promise<Meals>{
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            return await this.mealService.update(id,user,updateRecipeDto)
        }catch(error){
            console.log(error);
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('add-meal-to-history/:id')
    async addMealHistory(
        @Param('id') meal_id: number,
        @GetUser() user: User|Coach,
    ): Promise<UserMealsHistory> {
        if(user instanceof Coach){
            user= await user.user
          }
        return this.mealService.addMealHistory(user, meal_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-meal-history')
    async getMyHistory(@GetUser() user: User|Coach): Promise<UserMealsHistory[]> {
        if(user instanceof Coach){
            user= await user.user
          }
        return this.mealService.getMyHistory(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-meal-from-history/:id')
    async deleteMealHistory(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<String> {
        if(user instanceof Coach){
            user= await user.user
          }
        return this.mealService.deleteMealHistory(id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-user-nutritions-from-history')
    async getTotalNutritionalValues(
        @Body() historyNutDto: getHistoryNutritionsDto,
        @GetUser() user: User|Coach,
    ): Promise<MealNutritionsDto> {
        if(user instanceof Coach){
            user= await user.user
          }
        return await this.mealService.getTotalNutritionalValues(historyNutDto,user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-user-nutritions-from-history-by-coach/:id')
    async getTotalNutritionalValuesById(
        @Param('id') treanee_id: number,
        @Body() historyNutDto: getHistoryNutritionsDto,
        @GetUser() user: Coach,
    ): Promise<MealNutritionsDto> {
        return await this.mealService.getTotalNutritionalValuesByCoach(treanee_id,historyNutDto,user);
    }
    
}

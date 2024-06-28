import { Controller, Get, Res, Param, Query,Post, UseGuards, Delete, Body, Patch, Put } from '@nestjs/common';
import { MealService } from './meal.service';
import { Meals } from '../../entity/meals.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { CreateMealDto } from './dtos/create-meal.dto';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { UserMealsHistory } from '../../entity/user_meals_history.entity';




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
        @GetUser() user: User,
    ):Promise<Meals> {
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
        @GetUser() user: User,
    ): Promise<{ message: string }> {
        await this.mealService.saveMeal(id, user);
        return { message: 'Meal saved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsave/:id')
    async unsaveMeal(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<{ message: string }> {
        await this.mealService.unSaveMeal(id, user);
        return { message: 'Meal unsaved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-saved-meals')
    async getAllSaved(@GetUser() user: User):Promise<Meals[]>{
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
        @GetUser() user: User,
    ): Promise<String> {
        console.log('delete Meal');
        return this.mealService.deleteMeal(user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-my-meals')
    async getAllByUser(@GetUser() user: User):Promise<Meals[]>{
        try{
            return await this.mealService.getAllByUser(user)
        }catch{
            throw new Error("Error while loading meals");
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @GetUser() user: User,
        @Body() updateRecipeDto: CreateMealDto
        ):Promise<Meals>{
        try{
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
        @GetUser() user: User,
    ): Promise<UserMealsHistory> {
        return this.mealService.addMealHistory(user, meal_id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-meal-history')
    async getMyHistory(@GetUser() user: User): Promise<UserMealsHistory[]> {
        return this.mealService.getMyHistory(user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-meal-from-history/:id')
    async deleteMealHistory(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<String> {
        return this.mealService.deleteMealHistory(id, user);
    }





    


    
}

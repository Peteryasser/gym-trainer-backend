import { Controller, Get, Res, Param, Query,Post, UseGuards, Delete, Body, Patch, Put } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { RecipeDto } from './dtos/recipe_info.dto';
import { RecipeIngredientDto } from './dtos/recipe-ingredient.dto';
import { Recipes } from '../../entity/recipes.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { Coach } from 'src/entity/coach.entity';



@Controller('recipe')
export class RecipeController { 
   

    constructor(private readonly recipeService: RecipeService) {
      
      
    }

    @Post('create-from-json')
    async readIngredients(@Res() res: Response): Promise<any> {
        const filePath = 'src/nutrition_side/recipe/response.json';
        const allData = this.readJsonFile(filePath)['recipes']
        let recipe: RecipeDto;
        for(let data of allData){
          recipe =  await this.parseData(data);
          await this.recipeService.createRecipe(recipe)
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({ imageUrl: recipe});
    }

    async parseData(data: any): Promise<RecipeDto>{
      let recipeDto: RecipeDto= new RecipeDto;
      recipeDto.imageURL=data.image;
      recipeDto.name = data.title;
      recipeDto.cuisine=data.cuisines[0];
      recipeDto.readyInMinutes= data.readyInMinutes;
      recipeDto.dishType = data.dishTypes[0];
      recipeDto.summary= data.summary;
      recipeDto.instructions= data.instructions;
      recipeDto.servings= data.servings;
      recipeDto.is_custom=false;
      recipeDto.calories_kcal= data.nutrition.nutrients[0].amount;
      recipeDto.fat_g = data.nutrition.nutrients[1].amount;
      recipeDto.protein_g = data.nutrition.nutrients[8].amount;
      recipeDto.sugar_g = data.nutrition.nutrients[5].amount;
      recipeDto.ingredients= [];
      for(let ingredient of data.nutrition.ingredients){
        let recipeIngredientDto: RecipeIngredientDto = new RecipeIngredientDto;
        recipeIngredientDto.id=ingredient.id;
        recipeIngredientDto.amount=ingredient.amount;
        recipeIngredientDto.unit=ingredient.unit;
        recipeDto.ingredients.push(recipeIngredientDto);
      }

      return recipeDto;
    }

    readJsonFile(filePath: string): any {
        try {
          const data = readFileSync(filePath, 'utf8');
          return JSON.parse(data);
        } catch (error) {
          console.error('Error reading JSON file:', error);
          throw error;
        }
    }

    

    @Get('get-all-recipes-while-installing')
    async getAllrecipes():Promise<Recipes[]>{
        try{
            return await this.recipeService.getAllRecipes()
        }catch{
            throw new Error("Error while loading recipes");;
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post('save/:id')
    async saveRecipe(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        if(user instanceof Coach){
            user= await user.user
          }
        await this.recipeService.saveRecipe(id, user);
        return { message: 'Recipe saved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsave/:id')
    async unsaveRecipe(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        if(user instanceof Coach){
            user= await user.user
          }
        await this.recipeService.unSaveRecipe(id, user);
        return { message: 'Recipe unsaved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-saved-recipes')
    async getAllSaved(@GetUser() user: User|Coach):Promise<Recipes[]>{
        if(user instanceof Coach){
            user= await user.user
          }
        return this.recipeService.getAllSaved(user)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create-custom-recipe')
    async create(
        @Body() createRecipeDto: CreateRecipeDto,
        @GetUser() user: User|Coach,
    ):Promise<Recipes> {
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            return await this.recipeService.createCustom(createRecipeDto,user);
        }catch(error){
            return error;
        }
         
    }

    @UseGuards(JwtAuthGuard)
    @Get('get_all_recipes')
    async getAll():Promise<Recipes[]>{
        try{
            return await this.recipeService.getAllRecipes()
        }catch{
            throw new Error("Error while loading recipes");;
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('get-recipe/:id')
    async getRecipe(
        @Param('id') id: number,
    ): Promise<Recipes> {
        return await this.recipeService.getRecipe(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    async deleteRecipe(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<String> {
        if(user instanceof Coach){
            user= await user.user
          }
        console.log('delete Recipe');
        return this.recipeService.deleteRecipe(user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-my-recipes')
    async getAllByUser(@GetUser() user: User|Coach):Promise<Recipes[]>{
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            return await this.recipeService.getAllByUser(user)
        }catch{
            throw new Error("Error while loading recipes");
        }

    }

    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    async update(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
        @Body() updateRecipeDto: CreateRecipeDto
        ):Promise<Recipes>{
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            return await this.recipeService.update(id,user,updateRecipeDto)
        }catch(error){
            console.log(error);
            return error;
        }
    }


    
}

import { Controller, Get, Res, Param, BadRequestException, Query, UseGuards, Post, Delete } from '@nestjs/common';
import { IngredientInfoDto } from '../../nutrition_side/ingredient/dtos/ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Response } from 'express';
import { CloudinaryService } from '../../utils/cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../entity/user.entity';
import { Ingredient } from '../../entity/ingredients.entity';
import { Coach } from 'src/entity/coach.entity';


@Controller('ingredient')
export class IngredientController { 
  cloudinary;
  ninja_api_url;
  ninja_api_key;
  spoonacular_api_url;
  spoonacular_api_key;

  constructor(private readonly ingredientService: IngredientService) {
    this.cloudinary = new CloudinaryService();
    this.ninja_api_url = process.env.NINJA_API_URL;
    this.ninja_api_key = process.env.NINJA_API_KEY;
    this.spoonacular_api_url = process.env.SPOONACULAR_API_URL;
    this.spoonacular_api_key = process.env.SPOONACULAR_API_KEY;
    
  }

  // Call the function with the path to your CSV file
  @Get('read-ingredients')
  async readIngredients(): Promise<IngredientInfoDto[]> {
    const filePath = 'src/top-1k-ingredients.csv';
    const ingredients = await this.ingredientService.processIngredientsFile(filePath);
    return ingredients;
}
/*    @Get('get_ingredient_info/:name')
    async getIngredientHealtyDetails(@Param('name') name: string): Promise<IngredientInfoDTO> {

        try {
            const response = await axios.get(`${this.ninja_api_url}${name}`, {
                headers: {
                    'X-Api-Key': this.ninja_api_key,
                },
            });
            const data = response.data[0] as IngredientInfoDTO;
            return data;
        } catch (error) {
            if (error.response) {
                console.error(`Error: ${error.response.status} ${error.response.data}`);
                throw new Error(`Error: ${error.response.status} ${error.response.data}`);
            } else if (error.request) {
                console.error(`Error: No response received from the server`);
                throw new Error('Error: No response received from the server');
            } else {
                console.error(`Error: ${error.message}`);
                throw new Error(`Error: ${error.message}`);
            }
        }
    }*/


   

    @Get('get_all_ingredients_while_installing')
    async gettAllForApp():Promise<Ingredient[]>{
        try{
            return await this.ingredientService.getAllIngredients()
        }catch{
            throw new Error("Error while loading ingredients");;
        }
    }

   @Get('get_all_ingredient_data')
    async getAll(@Query('ingredient') ingredient: string,@Res() res: Response): Promise<void> {
        try {
            const ingredientInfoDTO: IngredientInfoDto = JSON.parse(ingredient);
            const data = await this.ingredientService.getAllAndSave(ingredientInfoDTO);
            console.log("DATA", data)
            res.status(200).send(data);
          } catch (error) {
            throw new Error("Error");
          }
    }
    @UseGuards(JwtAuthGuard)
    @Post('save/:id')
    async saveIngredient(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        try{
            if(user instanceof Coach){
                user= await user.user
              }
            await this.ingredientService.saveIngredient(id, user);
            return { message: 'Ingredient saved successfully' };
        }catch(error){
            return error
        }
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsave/:id')
    async unsaveIngredient(
        @Param('id') id: number,
        @GetUser() user: User|Coach,
    ): Promise<{ message: string }> {
        if(user instanceof Coach){
            user= await user.user
          }
        console.log('unsaveIngredient');
        await this.ingredientService.unSaveIngredient(id, user);
        return { message: 'Ingredient unsaved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-saved-ingredients')
    async getAllSaved(@GetUser() user: User|Coach):Promise<Ingredient[]>{
        if(user instanceof Coach){
            user= await user.user
          }
        return this.ingredientService.getAllSaved(user)
    }


    
}
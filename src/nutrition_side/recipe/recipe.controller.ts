import { Controller, Get, Res, Param, Query,Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import axios from 'axios';
import { Response } from 'express';
import { CLOUDINARY_INGREDIENTS_FOLDER_NAME } from 'src/constants';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { v2 } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';
import { readFileSync } from 'fs';
import { RecipeDto } from './dtos/recipe_info.dto';
import { RecipeIngredientDto } from './dtos/recipe-ingredient.dto';



@Controller('recipe')
export class RecipeController { 
    cloudinary;
    ninja_api_url;
    ninja_api_key;
    spoonacular_api_url;
    spoonacular_api_key;

    constructor(private readonly recipeService: RecipeService) {
      this.cloudinary = new CloudinaryService();
      this.ninja_api_url = process.env.NINJA_API_URL;
      this.ninja_api_key = process.env.NINJA_API_KEY;
      this.spoonacular_api_url = process.env.SPOONACULAR_API_URL;
      this.spoonacular_api_key = process.env.SPOONACULAR_API_KEY;
      
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
        recipeIngredientDto.ingredientId=ingredient.id;
        recipeIngredientDto.ingredientName=ingredient.name;
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

    @Get('get_image')
    async getImage(@Query('imagePath') imagePath: string, @Res() res: Response): Promise<void> {
        try {
            const imageResponse = await axios.get(imagePath, {
                responseType: 'stream', // Set response type to stream to directly pipe it to response
                headers: {
                    'x-api-key': this.spoonacular_api_key,
                },
            });

            const link = await this.uploadIngredientImageToCloudinary(imageResponse.data);
        
            // Set response type to JSON and send the link
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ imageUrl: link });
            // return Buffer.from(imageResponse.data, 'binary');
        } catch (error) {
            console.error('Error fetching image:', error);
            // Return an error response if something goes wrong
            res.status(500).send('Internal server error');
        }
    }



    async uploadIngredientImageToCloudinary(imageStream: Readable): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream(
                {
                    folder: CLOUDINARY_INGREDIENTS_FOLDER_NAME,
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Image upload failed'));
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
    
            imageStream.pipe(uploadStream);
        });
    }
    
}

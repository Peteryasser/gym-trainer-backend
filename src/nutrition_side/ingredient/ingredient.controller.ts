import { Controller, Get, Res, Param, BadRequestException } from '@nestjs/common';
import { IngredientInfoDto } from 'src/nutrition_side/ingredient/dtos/ingredient.dto';
import { IngredientService } from './ingredient.service';
import * as request from 'request';
import { headers } from 'next/headers';
import axios from 'axios';
import { Response } from 'express';
import { CLOUDINARY_INGREDIENTS_FOLDER_NAME } from 'src/constants';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { v2 } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';

@Controller()
export class IngredientController {
  ingredientService;
  cloudinary;
  ninja_api_url;
  ninja_api_key;
  spoonacular_api_url;
  spoonacular_api_key;

  constructor() {
    this.ingredientService = new IngredientService();
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

    @Get('get_ingredient_info/:name')
    async getIngredientHealtyDetails(@Param('name') name: string): Promise<any> {

        try {
            const response = await axios.get(`${this.ninja_api_url}${name}`, {
                headers: {
                    'X-Api-Key': this.ninja_api_key,
                },
            });
            return response.data;
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
    }


    @Get('get_ingredient_details_by_id/:id') // Adjusted route definition to include the 'id' parameter
    async getIngredientDetails(@Param('id') id: string): Promise<any> {
        try {
            const response = await axios.get(`${this.spoonacular_api_url}${id}/information`, {
                headers: {
                    'X-Api-Key': this.spoonacular_api_key,
                },
            });

            return response.data;
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
    }

    @Get('get_image/:imageName')
    async getImage(@Param('imageName') imageName: string, @Res() res: Response): Promise<string> {
        try {
            const imageResponse = await axios.get(`https://img.spoonacular.com/ingredients_500x500/${imageName}`, {
                responseType: 'stream', // Set response type to stream to directly pipe it to response
                headers: {
                    'x-api-key': this.spoonacular_api_key,
                },
            });

            res.setHeader('Content-Type', 'image/jpeg');                // Set content type header for the image
            imageResponse.data.pipe(res);        // Pipe the image data directly to the response
            
            const link = await this.uploadIngredientImageToCloudinary(imageResponse.data);
            console.log(link);
            return link;

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

    @Get('get_all_ingredient_data')
    async getAll(@Res() res: Response): Promise<void> {
        try {
            const ingredients = (await axios.get('http://localhost:3000/read-ingredients', {})).data;
            for(let ingredient of ingredients){
                try{
                    const info = (await axios.get(`http://localhost:3000/get_ingredient_info/${ingredient.name}`, {})).data;
                    const info2 = (await axios.get(`http://localhost:3000/get_ingredient_details_by_id/${ingredient.id}`, {})).data;
                    const imageName = info2.image;
                    const cat = info2.categoryPath[0]
                    console.log(imageName, cat)
                    const link = (await axios.get(`http://localhost:3000/get_image/${imageName}`, {})).data;
                    


                }catch (error){
                    continue;
                }

            
            }
            
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal server error');
        }
    }




}

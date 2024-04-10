import { Controller, Get, Res } from '@nestjs/common';
import { IngredientInfoDto } from 'src/dtos/ingredient.dto';
import { IngredientService } from './ingredient.service';
import * as request from 'request';
import { headers } from 'next/headers';
import { Param } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';

@Controller()
export class IngredientController {
    ingredientService;
    ninja_api_url = 'https://api.api-ninjas.com/v1/nutrition?query=';
    ninja_api_key = '6R4a7wGbVEky7vQR8XG8Pg==P1zy9b4aNrXh1ed7';
    sponacular_api_url = 'https://api.spoonacular.com/food/ingredients/';
    sponacular_api_key = 'bab678bfea8346c5b1723b6c14226d7d';

    constructor() {
        this.ingredientService = new IngredientService();
    }

    // Call the function with the path to your CSV file
    @Get('read-ingredients')
    async readIngredients(): Promise<IngredientInfoDto[]> {
        const filePath = 'src/top-1k-ingredients.csv';
        const ingredients = await this.ingredientService.processIngredientsFile(filePath);
        console.log(ingredients);
        console.log('Number of ingredients:', ingredients.length);
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

            console.log(response.data);
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
        const options = {
            method: 'GET',
            url: `${this.sponacular_api_url}${id}/information`,
            headers: {
                'x-api-key': this.sponacular_api_key,
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data; // Return the data received from the API
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error to be handled by NestJS error handling mechanism
        }
    }

    @Get('get_image/:imageName')
    async getImage(@Param('imageName') imageName: string, @Res() res: Response): Promise<void> {
        try {

            const imageResponse = await axios.get(`https://img.spoonacular.com/ingredients_500x500/${imageName}`, {
                headers: {
                    'x-api-key': this.sponacular_api_key,
                }
            });
            res.set('Content-Type', imageResponse.headers['content-type']);
            res.send(imageResponse.data);
        } catch (error) {
            console.error('Error fetching image:', error);
            res.status(500).send('Error fetching image');
        }
    }


}

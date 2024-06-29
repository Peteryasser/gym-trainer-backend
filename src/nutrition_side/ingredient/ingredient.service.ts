import { Injectable, NotFoundException } from '@nestjs/common';
import { CSVReaderService } from '../../utils/Readers/csv_reader.service';
import { IngredientInfoDto } from '../../nutrition_side/ingredient/dtos/ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../../entity/ingredients.entity';
import { IngredientCategory } from '../../entity/ingredient_categories.entity';
import { IngredientDetailsDTO } from './dtos/ingredient-details.dto';
import { NutrientsDto } from './dtos/nutrients.dto';
import axios from 'axios';
import { User } from '../../entity/user.entity';
import { SavedIngredients } from '../../entity/saved_ingredients.entity';
import { CLOUDINARY_INGREDIENTS_FOLDER_NAME } from '../../constants';
import { v2 } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';


@Injectable()
export class IngredientService {
  private csvReader: CSVReaderService;

  constructor(
    
    @InjectRepository(IngredientCategory)
    private readonly categoryRepository: Repository<IngredientCategory>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(SavedIngredients)
    private readonly savedIngredientsRepository: Repository<SavedIngredients>,
    
  ) {
    this.csvReader = new CSVReaderService();
  }

  async processIngredientsFile(filePath: string): Promise<IngredientInfoDto[]> {
    try {
      const ingredients = await this.csvReader.processCSVFile(filePath, (fields: string[]) => ({
        id: parseInt(fields[1]), // Assuming id is in the second column
        name: fields[0], // Assuming name is in the first column
      }));
      return ingredients;
    } catch (error) {
      // Handle errors here, e.g., log them or throw a custom exception
      throw new NotFoundException('Failed to process ingredients file');
    }
  }

  async getIngredientDetails(id: number): Promise<IngredientDetailsDTO> {
      try {
          const response = await axios.get(`${process.env.SPOONACULAR_API_URL}${id}/information?amount=1`, {
              headers: {
                  'X-Api-Key': process.env.SPOONACULAR_API_KEY,
                  
              },
          });
          const data = response.data as IngredientDetailsDTO;
          data.nutrition= response.data.nutrition.nutrients;

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
  }

 
  async getImage(imageName: string): Promise<string> {
      try {
          const imageResponse = await axios.get(`https://img.spoonacular.com/ingredients_500x500/${imageName}`, {
              responseType: 'stream', // Set response type to stream to directly pipe it to response
              headers: {
                  'x-api-key': process.env.SPOONACULAR_API_KEY,
              },
          });

          const link = await this.uploadIngredientImageToCloudinary(imageResponse.data);
          return link;
      
          
      } catch (error) {
          console.error('Error fetching image:', error);
          
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

  async getAllAndSave(ingredient: IngredientInfoDto): Promise<Ingredient> {
    try {
        //const ingredients = (await axios.get('http://localhost:3000/api/v1/ingredient/read-ingredients', {})).data;
            try{
                /*const infoResponse = await axios.get(`http://localhost:3000/api/v1/ingredient/get_ingredient_info/${ingredient.name}`, {});
                const info: IngredientInfoDTO = infoResponse.data;
                console.log(info)
                if(!(typeof info.calories==='number')){
                  console.log("HEREEEEEEEEE")
                  throw new Error("Not Number");
                }*/


                const info2: IngredientDetailsDTO = await this.getIngredientDetails(ingredient.id);
                const nutrients: NutrientsDto[] = info2.nutrition;
                console.log(nutrients)
                const imageName = info2.image;
                const categoryName = info2.categoryPath[0]
                 // Upload image to Cloudinary
                 const linkResponse = await this.getImage(imageName);
                 const imageURL: string = linkResponse;
                 
                let category = await this.categoryRepository.findOne({ where: { name: categoryName } });
                if (!category) {
                    category = this.categoryRepository.create({ name: categoryName });
                    await this.categoryRepository.save(category);
                }
                const ingredientEntity = this.ingredientRepository.create({
                    name: info2.name,
                    calories: this.findNutrient(nutrients, 'Calories').amount,
                    fat: this.findNutrient(nutrients, 'Fat').amount,
                    fatSaturated: this.findNutrient(nutrients, 'Saturated Fat').amount,
                    protein: this.findNutrient(nutrients, 'Protein').amount,
                    sodium: this.findNutrient(nutrients, 'Sodium').amount,
                    potassium: this.findNutrient(nutrients, 'Potassium').amount,
                    cholesterol: this.findNutrient(nutrients, 'Cholesterol').amount,
                    carbohydrates: this.findNutrient(nutrients, 'Carbohydrates').amount,
                    fiber: this.findNutrient(nutrients, 'Fiber').amount,
                    sugar: this.findNutrient(nutrients, 'Sugar').amount,
                    imageURL: imageURL,
                    category: category,
                  });
        
                  const saved:Ingredient = await this.ingredientRepository.save(ingredientEntity);
                  return saved;

            }catch (error){
                console.log("Error in creating")
                throw new Error('Internal server error');
            }
        
    }
     catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
    }
  }
   findNutrient(nutrients, nutrientName) {
    return nutrients.find(nutrient => nutrient.name === nutrientName) || { amount: 0 };
  }

  async getAllIngredients(): Promise<Ingredient[]>{
    const ingredients: Ingredient[] = await this.ingredientRepository.find( {
      relations: ['category'],
    });
    return ingredients;
  }

  async saveIngredient(id: number, user: User): Promise<SavedIngredients> {
    const ingredient: Ingredient = await this.ingredientRepository.findOne( {
      where: { id },
      relations: ['category'],
    });

    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    const savedIngredient = this.savedIngredientsRepository.create({
      user,
      ingredient,
    });


    return await this.savedIngredientsRepository.save(savedIngredient);
  }

  async unSaveIngredient(id: number, user: User): Promise<void> {
    const savedIngredient = await this.savedIngredientsRepository.findOne( {
      where: { ingredient: {id: id}, user: { id: user.id } },
    });

    if (!savedIngredient) {
      throw new NotFoundException('Ingredient not found in your saved Ingredients');
    }

    await this.savedIngredientsRepository.delete({id:  savedIngredient.id });
  }
  async getAllSaved(user:User): Promise<Ingredient[]>{
    const savedIngredients = await this.savedIngredientsRepository.find({
      where: { user: { id: user.id } },
      relations: ['ingredient','ingredient.category'],
    });

    if (!savedIngredients.length) {
      throw new NotFoundException('No saved ingredients found for the user');
    }

    return savedIngredients.map(savedIngredient => ({
      ...savedIngredient.ingredient,
      category: savedIngredient.ingredient.category,
    }));
  }

  
}






import { Injectable, NotFoundException } from '@nestjs/common';
import { CSVReaderService } from 'src/utils/Readers/csv_reader.service';
import { IngredientInfoDto } from 'src/nutrition_side/ingredient/dtos/ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/entity/ingredients.entity';
import { IngredientCategory } from 'src/entity/ingredient_categories.entity';
import { IngredientDetailsDTO } from './dtos/ingredient-details.dto';
import { NutrientsDto } from './dtos/nutrients.dto';
import axios from 'axios';
import { User } from 'src/entity/user.entity';
import { ConnectionManager } from 'src/config/connection_manager';
import { SavedIngredients } from 'src/entity/saved_ingredients.entity';
import { use } from 'passport';


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

                const info2Response = await axios.get(`http://localhost:3000/api/v1/ingredient/get_ingredient_details_by_id/${ingredient.id}`, {});
                const info2: IngredientDetailsDTO = info2Response.data;
                const nutrients: NutrientsDto[] = info2.nutrition;
                console.log(nutrients)
                const imageName = info2.image;
                const categoryName = info2.categoryPath[0]
                 // Upload image to Cloudinary
                 const linkResponse = await axios.get(`http://localhost:3000/api/v1/ingredient/get_image/${imageName}`);
                 const imageURL: string = linkResponse.data.imageUrl;
                 
                let category = await this.categoryRepository.findOne({ where: { name: categoryName } });
                if (!category) {
                    category = this.categoryRepository.create({ name: categoryName });
                    await this.categoryRepository.save(category);
                }
                const ingredientEntity = this.ingredientRepository.create({
                    name: ingredient.name,
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
        
                  const saved = await this.ingredientRepository.save(ingredientEntity);
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

  async saveIngredient(id: number, user: User): Promise<void> {
    const ingredient = await this.ingredientRepository.findOne( {
      where: { id },
    });

    if (!ingredient) {
      throw new NotFoundException('ingredient not found');
    }

    const savedIngredients = new SavedIngredients();
    savedIngredients.user = user;
    savedIngredients.ingredient = ingredient;

    console.log('savedIngredient', savedIngredients);

    await this.savedIngredientsRepository.save(savedIngredients);
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
      relations: ['ingredient'],
    });

    if (!savedIngredients.length) {
      throw new NotFoundException('No saved ingredients found for the user');
    }

    return savedIngredients.map(savedIngredient => savedIngredient.ingredient);
  }

  
}





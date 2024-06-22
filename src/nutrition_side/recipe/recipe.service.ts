import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from 'src/entity/ingredients.entity';
import axios from 'axios';
import { Recipes } from 'src/entity/recipes.entity';
import { DishTypes } from 'src/entity/dish_types.entity';
import { Cuisines } from 'src/entity/cuisines.entity';
import { RecipesIngredients } from 'src/entity/recipes_ingredients.entity';
import { RecipeDto } from './dtos/recipe_info.dto';
import { User } from 'src/entity/user.entity';
import { IngredientInfoDto } from '../ingredient/dtos/ingredient.dto';

@Injectable()
export class RecipeService {

  constructor(
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(DishTypes)
    private readonly dishTypesRepository: Repository<DishTypes>,
    @InjectRepository(Cuisines)
    private readonly cuisinesRepository: Repository<Cuisines>,
    @InjectRepository(RecipesIngredients)
    private readonly recipesIngredientsRepository: Repository<RecipesIngredients>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async createRecipe(createRecipeDto: RecipeDto): Promise<void> {
    
    let dish = await this.dishTypesRepository.findOne({ where: { name: createRecipeDto.dishType } });
    if (!dish) {
      dish = this.dishTypesRepository.create({ name: createRecipeDto.dishType });
        await this.dishTypesRepository.save(dish);
    }
  
    let cuisin = await this.cuisinesRepository.findOne({ where: { name: createRecipeDto.cuisine } });
    if (!cuisin) {
      cuisin = this.cuisinesRepository.create({ name: createRecipeDto.cuisine });
        await this.cuisinesRepository.save(cuisin);
    }
    const linkResponse = await axios.get(`http://localhost:3000/api/v1/recipe/get_image?imagePath=${createRecipeDto.imageURL}`);
    const imageURL: string = linkResponse.data.imageUrl;
    let user=null;
    if(createRecipeDto.is_custom){
      user = await this.userRepository.findOne({ where: { id: createRecipeDto.user_id } });
    }

    const recipeEntity = this.recipesRepository.create({
      name: createRecipeDto.name,
      readyInMinutes: createRecipeDto.readyInMinutes,
      calories_kcal: createRecipeDto.calories_kcal,
      imageURL: imageURL,
      servings: createRecipeDto.servings,
      fat_g: createRecipeDto.fat_g,
      sugar_g: createRecipeDto.sugar_g,
      protein_g: createRecipeDto.protein_g,
      instructions: createRecipeDto.instructions,
      summary: createRecipeDto.summary,
      is_custom: createRecipeDto.is_custom,
      dishType: dish,
      cuisine: cuisin,
      user:user
    });

    const savedRecipe = await this.recipesRepository.save(recipeEntity);


    for (const ingredient of createRecipeDto.ingredients) {
      let ingredientEntity = await this.ingredientRepository.findOne({ where: { name: ingredient.ingredientName } });
      if (!ingredientEntity) {
        let ingredientInfoDTO: IngredientInfoDto = new IngredientInfoDto;
        ingredientInfoDTO.id = ingredient.ingredientId
        ingredientInfoDTO.name = ingredient.ingredientName 
        try{
          const response = await axios.get('http://localhost:3000/api/v1/ingredient/get_all_ingredient_data', {
            params: {
              ingredient: JSON.stringify(ingredientInfoDTO),
            },
          });
          ingredientEntity = response.data;
          console.log(ingredientEntity)
        }catch{
          ingredientEntity=null
        }
      }
      if(ingredientEntity!=null){
        const recipeIngredient = this.recipesIngredientsRepository.create({
          recipe: savedRecipe,
          ingredient: ingredientEntity,
          amount: ingredient.amount,
          unit: ingredient.unit
        });

        await this.recipesIngredientsRepository.save(recipeIngredient);
      }
      
    }

  }

}
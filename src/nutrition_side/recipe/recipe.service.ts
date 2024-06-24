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
import { SavedRecipes } from 'src/entity/saved_recipes.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeExtentedIngredients } from 'src/entity/recipe-extentedIngredient.entity';
import { CLOUDINARY_INGREDIENTS_FOLDER_NAME } from 'src/constants';
import { v2 } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';
import { IngredientService } from '../ingredient/ingredient.service';

@Injectable()
export class RecipeService {

  constructor(
    private readonly ingredientService: IngredientService,
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(RecipeExtentedIngredients)
    private readonly recipeExtentedIngredients: Repository<RecipeExtentedIngredients>,
    @InjectRepository(DishTypes)
    private readonly dishTypesRepository: Repository<DishTypes>,
    @InjectRepository(Cuisines)
    private readonly cuisinesRepository: Repository<Cuisines>,
    @InjectRepository(RecipesIngredients)
    private readonly recipesIngredientsRepository: Repository<RecipesIngredients>,
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
    @InjectRepository(SavedRecipes)
    private readonly savedRecipesRepository: Repository<SavedRecipes>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  
  
    async getImage(imagePath: string): Promise<string> {
        try {
            const imageResponse = await axios.get(imagePath, {
                responseType: 'stream', // Set response type to stream to directly pipe it to response
                headers: {
                    'x-api-key': process.env.SPOONACULAR_API_KEY,
                },
            });

            const link = await this.uploadIngredientImageToCloudinary(imageResponse.data);
        
            
            return link;
            // return Buffer.from(imageResponse.data, 'binary');
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
    let imageURL: string = null;
    if(createRecipeDto.imageURL!=null){
      imageURL = await this.getImage(createRecipeDto.imageURL);
    }
    
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
      let ingredientEntity: Ingredient = await this.ingredientRepository.findOne({ where: { id : ingredient.id } });
      if (!ingredientEntity) {
        let ingredientInfoDTO: IngredientInfoDto = new IngredientInfoDto;
        ingredientInfoDTO.id = ingredient.id
        try{
          
          ingredientEntity= await this.ingredientService.getAllAndSave(ingredientInfoDTO)
          ingredientInfoDTO.name = ingredientEntity.name 

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

  async getAllRecipes(): Promise<Recipes[]>{
    const recipes: Recipes[]= await this.recipesRepository.find({
      
      relations: ["user", "dishType", "extentedIngredients", "cuisine", "recipeIngredients", "recipeIngredients.ingredient"]
      });

      return recipes
  }

  async getRecipe(id:number): Promise<Recipes>{
    const recipe: Recipes= await this.recipesRepository.findOne({
      where: { id: id } ,
      relations: ["user", "dishType", "extentedIngredients", "cuisine", "recipeIngredients", "recipeIngredients.ingredient"]
      });

      return recipe;
  }

  async saveRecipe(id: number, user: User): Promise<void> {
    const recipe: Recipes = await this.recipesRepository.findOne( {
      where: { id },
    });

    if (!recipe) {
      throw new NotFoundException('recipe not found');
    }

    const saveRecipe = new SavedRecipes();
    saveRecipe.user = user;
    saveRecipe.recipe = recipe;


    await this.savedRecipesRepository.save(saveRecipe);
  }

  async unSaveRecipe(id: number, user: User): Promise<void> {
    const savedRecipe = await this.savedRecipesRepository.findOne( {
      where: { recipe: {id: id}, user: { id: user.id } },
    });

    if (!savedRecipe) {
      throw new NotFoundException('Recipe not found in your saved Recipes');
    }

    await this.savedRecipesRepository.delete({id:  savedRecipe.id });
  }
  async getAllSaved(user:User): Promise<Recipes[]>{
    const savedRecipes = await this.savedRecipesRepository.find({
      where: { user: { id: user.id } },
      relations: ['recipe',"recipe.dishType", "recipe.extentedIngredients", "recipe.cuisine", "recipe.recipeIngredients", "recipe.recipeIngredients.ingredient"],
    });

    if (!savedRecipes.length) {
      throw new NotFoundException('No saved ingredients found for the user');
    }
    console.log(savedRecipes)

    return savedRecipes.map(savedRecipe => ({
      ...savedRecipe.recipe,
      dishType: savedRecipe.recipe.dishType,
      extentedIngredients: savedRecipe.recipe.extentedIngredients,
      cuisine: savedRecipe.recipe.cuisine,
      recipeIngredients: savedRecipe.recipe.recipeIngredients
    }));
  }

  async createCustom(createRecipeDto: CreateRecipeDto, user:User): Promise<Recipes> {
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
    let extentedIngredients: RecipeExtentedIngredients= null;
    if(createRecipeDto.extentedIngredients!=null){
    extentedIngredients = await this.recipeExtentedIngredients.findOne({ where: { ingredients: createRecipeDto.extentedIngredients } });
        if (!extentedIngredients) {
          extentedIngredients = this.recipeExtentedIngredients.create({ ingredients: createRecipeDto.extentedIngredients });
            await this.recipeExtentedIngredients.save(extentedIngredients);
        }
    }
    
    
    let imageURL: string = null;
    if(createRecipeDto.imageURL!=null){
      imageURL = await this.getImage(createRecipeDto.imageURL);
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
      is_custom: true,
      dishType: dish,
      cuisine: cuisin,
      user:user,
      extentedIngredients: extentedIngredients
    });


    const savedRecipe = await this.recipesRepository.save(recipeEntity);

    console.log("HEREEEEEEE",createRecipeDto.recipeIngredients,createRecipeDto.recipeIngredients.length)

    if(createRecipeDto.recipeIngredients.length!=0){
      for (const ingredient of createRecipeDto.recipeIngredients) {
      let ingredientEntity = await this.ingredientRepository.findOne({ where: { id: ingredient.id } });
      
      if(ingredientEntity!=null){
        const recipeIngredient = this.recipesIngredientsRepository.create({
          recipe: savedRecipe,
          ingredient: ingredientEntity,
          amount: ingredient.amount,
          unit: ingredient.unit
        });
        await this.recipesIngredientsRepository.save(recipeIngredient);
        console.log("SAVED",recipeIngredient)

        //savedRecipe.recipeIngredients.push(recipeIngredient)
      }  
    }
    }

    return savedRecipe;

  }

  async deleteRecipe(user: User, id: number) {
    
    let message = '';

    const recipe = await this.recipesRepository.findOne({
      where: { id: id, user: { id: user.id } },
      relations: ["user", "dishType", "extentedIngredients", "cuisine", "recipeIngredients"],
    });

    if (!recipe) {
      message = 'Recipe not found';
      return message;
    }

    
    
    for (const recipeIngredient of recipe.recipeIngredients) {
      
      await this.recipesIngredientsRepository.delete(
        recipeIngredient
      );
    }

    await this.recipesRepository.remove(recipe);
    return 'Recipe deleted successfully';
  }

  async getAllByUser(user: User): Promise<Recipes[]>{
    const recipes = await this.recipesRepository.find({
      where: { user: { id: user.id } },
      relations: ["user", "dishType", "extentedIngredients", "cuisine", "recipeIngredients", "recipeIngredients.ingredient"],
    });
    console.log(recipes[0].recipeIngredients)
    return recipes;
  }

  async update(id: number, user: User,updateRecipeDto: CreateRecipeDto): Promise<Recipes>{

    const recipe = await this.recipesRepository.findOne({
      where: { id: id, user: { id: user.id } },
      relations: ["user", "dishType", "extentedIngredients", "cuisine", "recipeIngredients", "recipeIngredients.ingredient"],
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found or you are not authorized to update this`);
    }
    console.log("IIIIIIIIII",updateRecipeDto)
    await this.deleteRecipe(user,id);
    return this.createCustom(updateRecipeDto,user);
  }


  
}
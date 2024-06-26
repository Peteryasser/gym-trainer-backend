import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meals } from 'src/entity/meals.entity';
import { Repository } from 'typeorm';
import { CreateMealDto } from './dtos/create-meal.dto';
import { User } from 'src/entity/user.entity';
import { MealCategories } from 'src/entity/meal_categories.entity';
import { Recipes } from 'src/entity/recipes.entity';
import { MealRecipes } from 'src/entity/meal_recipes.entity';
import { SavedMeals } from 'src/entity/saved_meals.entity';
import { UserMealsHistory } from 'src/entity/user_meals_history.entity';


@Injectable()
export class MealService {

  constructor(
    @InjectRepository(Meals)
    private readonly mealsRepository: Repository<Meals>,
    @InjectRepository(SavedMeals)
    private readonly savedMealsRepository: Repository<SavedMeals>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MealCategories)
    private readonly mealCategoriesRepository: Repository<MealCategories>,
    @InjectRepository(Recipes)
    private readonly recipesRepository: Repository<Recipes>,
    @InjectRepository(MealRecipes)
    private readonly mealRecipesRepository: Repository<MealRecipes>,
    @InjectRepository(UserMealsHistory)
    private readonly userMealsHistoryRepository: Repository<UserMealsHistory>,
    
  ){}
  
  async create(createMealDto: CreateMealDto,user: User): Promise<Meals> {
    let category = await this.mealCategoriesRepository.findOne({ where: { name: createMealDto.category } });
    if (!category) {
        category = this.mealCategoriesRepository.create({ name: createMealDto.category });
        await this.mealCategoriesRepository.save(category);
    }
    const recipes:Recipes[]=[];
    let total_cal=0;
    if(createMealDto.recipeIds.length!=0){
        for(const id of createMealDto.recipeIds ){
            let recipeEntity = await this.recipesRepository.findOne({ where: { id: id } });
            if(recipeEntity!=null){
                recipes.push(recipeEntity);
                total_cal+=recipeEntity.calories_kcal;
            }
        }
      }
      if(createMealDto.total_calories_kcal){
        total_cal=createMealDto.total_calories_kcal;
      }
    const mealEntity = this.mealsRepository.create({
        name: createMealDto.name,
        total_calories: total_cal,
        imageURL: createMealDto.imageURL||null,
        description: createMealDto.description,
        is_custom: user?true: false,
        category: category,
        user: user
      });
      const savedMeal = await this.mealsRepository.save(mealEntity);
      
      if(createMealDto.recipeIds.length!=0){
        for(const recipeEntity of recipes ){
            const mealRecipe = this.mealRecipesRepository.create({
            meal: savedMeal,
            recipe: recipeEntity,
        });
        await this.mealRecipesRepository.save(mealRecipe);
        }
       }
      return savedMeal;
  }

  async getAllMeals(): Promise<Meals[]>{
    const meals: Meals[]= await this.mealsRepository.find({
      
      relations: ['user', 'category','mealRecipes','mealRecipes.recipe']
      });
      
      return meals
  }

  async saveMeal(id: number, user: User): Promise<void> {
    const meal: Meals = await this.mealsRepository.findOne( {
      where: { id },
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    const saveMeal = new SavedMeals();
    saveMeal.user = user;
    saveMeal.meal = meal;


    await this.savedMealsRepository.save(saveMeal);
  }

  async unSaveMeal(id: number, user: User): Promise<void> {
    const savedMeal: SavedMeals = await this.savedMealsRepository.findOne( {
      where: { meal: {id: id}, user: { id: user.id } },
    });

    if (!savedMeal) {
      throw new NotFoundException('Meal not found in your saved Meals');
    }
    await this.savedMealsRepository.delete({meal_id:  savedMeal.meal_id});
  }

  async getAllSaved(user:User): Promise<Meals[]>{
    const savedMeals = await this.savedMealsRepository.find({
      where: { user: { id: user.id } },
      relations: ['user','meal', 'meal.category','meal.mealRecipes','meal.mealRecipes.recipe']
    });

    if (!savedMeals.length) {
      throw new NotFoundException('No saved Meals found for the user');
    }

    return savedMeals.map(savedMeal => ({
      ...savedMeal.meal,
      category: savedMeal.meal.category,      
      mealRecipes: savedMeal.meal.mealRecipes
    }));
  }

  async getMeal(id:number): Promise<Meals>{
    const meal: Meals= await this.mealsRepository.findOne({
      where: { id: id } ,
      relations: ['user', 'category','mealRecipes','mealRecipes.recipe']
      });

      return meal;
  }

  async deleteMeal(user: User, id: number) {
    
    let message = '';

    const meal = await this.mealsRepository.findOne({
      where: { id: id, user: { id: user.id } },
      relations: ['user', 'category','mealRecipes','mealRecipes.recipe']
    });

    if (!meal) {
      message = 'meal not found';
      return message;
    }

    for (const mealRecipe of meal.mealRecipes) {
      
        await this.mealRecipesRepository.delete(
          mealRecipe
        );
      }
  
      await this.mealsRepository.remove(meal);
      return 'Meal deleted successfully';
    }

    async getAllByUser(user: User): Promise<Meals[]>{
        const meals = await this.mealsRepository.find({
          where: { user: { id: user.id } },
          relations: ['user', 'category','mealRecipes','mealRecipes.recipe']
        });
        return meals;
      }

    async update(id: number, user: User,updateRecipeDto: CreateMealDto): Promise<Meals>{

        const meal = await this.mealsRepository.findOne({
            where: { id: id, user: { id: user.id } },
            relations: ['user', 'category','mealRecipes','mealRecipes.recipe']
        });
        if (!meal) {
            throw new NotFoundException(`Meal with ID ${id} not found or you are not authorized to update this`);
        }
        await this.deleteMeal(user,id);
        return this.create(updateRecipeDto,user);
    }

    async addMealHistory(
        user: User,
        meal_id: number,
      ):Promise<UserMealsHistory> {
    
        const meal:Meals =await this.getMeal(meal_id)
        if (!meal) {
          throw new NotFoundException('Meal Not Found');
        }
    
        const mealHistory = new UserMealsHistory();
        mealHistory.user = user;
        mealHistory.meal = meal;
        mealHistory.date = new Date();
    
        return await this.userMealsHistoryRepository.save(mealHistory);
        
      }

      async getMyHistory(user: User): Promise<UserMealsHistory[]> {
    
        const mealHistory = await this.userMealsHistoryRepository.find( {
          where: { user: { id: user.id } },
          relations: [
            'meal','meal.category','meal.mealRecipes','meal.mealRecipes.recipe'
          ],
        });
    
        return mealHistory;
      }

      async deleteMealHistory(id: number, user: User) {
        let message = '';
        const mealHistory = await this.userMealsHistoryRepository.findOne({
          where: { id, user: { id: user.id } },
        });
    
        if (!mealHistory) {
          message = 'Meal History not found';
          return message;
        }
    
        await this.userMealsHistoryRepository.remove(mealHistory);
        message = 'Meal History deleted successfully';
        return message;
      }
}
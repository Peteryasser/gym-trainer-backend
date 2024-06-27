import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { IngredientService } from '../ingredient/ingredient.service'; // Adjust path as per your actual implementation
import { Repository } from 'typeorm';
import { Recipes } from 'src/entity/recipes.entity';
import { DishTypes } from 'src/entity/dish_types.entity';
import { Cuisines } from 'src/entity/cuisines.entity';
import { RecipesIngredients } from 'src/entity/recipes_ingredients.entity';
import { RecipeDto } from './dtos/recipe_info.dto';
import { User } from 'src/entity/user.entity';
import { SavedRecipes } from 'src/entity/saved_recipes.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeExtentedIngredients } from 'src/entity/recipe-extentedIngredient.entity';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ingredient } from 'src/entity/ingredients.entity';

// Mock imports as needed
jest.mock('../ingredient/ingredient.service');
jest.mock('typeorm', () => ({
  Repository: jest.fn().mockImplementation(() => ({
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  })),
}));

describe('RecipeService', () => {
  let service: RecipeService;
  let module: TestingModule;
  let recipesRepository: Repository<Recipes>;
  let dishTypesRepository: Repository<DishTypes>;
  let cuisinesRepository: Repository<Cuisines>;
  let recipesIngredientsRepository: Repository<RecipesIngredients>;
  let ingredientRepository: Repository<Ingredient>;
  let userRepository: Repository<User>;
  let ingredientService: IngredientService;
  let savedRecipesRepository: Repository<SavedRecipes>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        RecipeService,
        IngredientService,
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<Recipes>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<RecipeExtentedIngredients>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<DishTypes>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<Cuisines>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<RecipesIngredients>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<SavedRecipes>> },
        { provide: Repository, useClass: jest.fn() as jest.Mock<Repository<User>> },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    recipesRepository = module.get<Repository<Recipes>>(getRepositoryToken(Recipes));
    dishTypesRepository = module.get<Repository<DishTypes>>(getRepositoryToken(DishTypes));
    cuisinesRepository = module.get<Repository<Cuisines>>(getRepositoryToken(Cuisines));
    recipesIngredientsRepository = module.get<Repository<RecipesIngredients>>(
      getRepositoryToken(RecipesIngredients),
    );
    ingredientRepository = module.get<Repository<Ingredient>>(getRepositoryToken(Ingredient));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    ingredientService = module.get<IngredientService>(IngredientService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('saveRecipe', () => {
    it('should save a recipe for a user', async () => {
      const user = new User();
      const recipe = new Recipes();
      jest.spyOn(recipesRepository, 'findOne').mockResolvedValue(recipe);
      jest.spyOn(savedRecipesRepository, 'save').mockResolvedValue(null);

      await service.saveRecipe(1, user);

      expect(recipesRepository.findOne).toHaveBeenCalled();
      expect(savedRecipesRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        user,
        recipe,
      }));
    });

    it('should throw NotFoundException when trying to save a non-existent recipe', async () => {
      const user = new User();
      jest.spyOn(recipesRepository, 'findOne').mockResolvedValue(null);

      await expect(service.saveRecipe(999, user)).rejects.toThrowError(NotFoundException);
    });
  });

  // Add more test cases for other methods as needed

});


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipes } from '../../entity/recipes.entity';
import { DishTypes } from '../../entity/dish_types.entity';
import { Cuisines } from '../../entity/cuisines.entity';
import { RecipesIngredients } from '../../entity/recipes_ingredients.entity';
import { Ingredient } from '../../entity/ingredients.entity';
import { User } from '../../entity/user.entity';
import { SavedRecipes } from '../../entity/saved_recipes.entity';
import { RecipeExtentedIngredients } from '../../entity/recipe-extentedIngredient.entity';
import { IngredientModule } from '../ingredient/ingredient.module';




@Module({
  imports: [TypeOrmModule.forFeature([Recipes,DishTypes,Cuisines,RecipesIngredients,Ingredient,User,SavedRecipes,RecipeExtentedIngredients]),IngredientModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule { }
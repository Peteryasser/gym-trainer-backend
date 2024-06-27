import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Recipes } from 'src/entity/recipes.entity';
import { DishTypes } from 'src/entity/dish_types.entity';
import { Cuisines } from 'src/entity/cuisines.entity';
import { RecipesIngredients } from 'src/entity/recipes_ingredients.entity';
import { Ingredient } from 'src/entity/ingredients.entity';
import { User } from 'src/entity/user.entity';
import { SavedRecipes } from 'src/entity/saved_recipes.entity';
import { RecipeExtentedIngredients } from 'src/entity/recipe-extentedIngredient.entity';
import { IngredientModule } from '../ingredient/ingredient.module';




@Module({
  imports: [TypeOrmModule.forFeature([Recipes,DishTypes,Cuisines,RecipesIngredients,Ingredient,User,SavedRecipes,RecipeExtentedIngredients]),IngredientModule],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule { }
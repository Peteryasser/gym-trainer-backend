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




@Module({
  imports: [TypeOrmModule.forFeature([Recipes,DishTypes,Cuisines,RecipesIngredients,Ingredient,User])],
  providers: [RecipeService],
  controllers: [RecipeController],
})
export class RecipeModule { }
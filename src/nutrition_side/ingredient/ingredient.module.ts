import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { Ingredient } from 'src/entity/ingredients.entity';
import { IngredientCategory } from 'src/entity/ingredient_categories.entity';
import { SavedIngredients } from 'src/entity/saved_ingredients.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientCategory,SavedIngredients])],
  providers: [IngredientService],
  controllers: [IngredientController],
  exports: [IngredientService],

})
export class IngredientModule { }
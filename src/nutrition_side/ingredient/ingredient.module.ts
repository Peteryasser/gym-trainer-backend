import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { Ingredient } from 'src/entity/ingredient';
import { IngredientCategory } from 'src/entity/ingredient_category';


@Module({
  imports: [TypeOrmModule.forFeature([Ingredient, IngredientCategory])],
  providers: [IngredientService],
  controllers: [IngredientController],
})
export class IngredientModule {

  constructor() {
    
  }
}

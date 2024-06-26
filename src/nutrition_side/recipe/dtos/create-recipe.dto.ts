import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';



export class CreateRecipeDto {
  @IsString()
  name: string;

  @IsString()
  imageURL: string;

  @IsNumber()
  calories_kcal: number;

  @IsNumber()
  fat_g: number;

  @IsNumber()
  sugar_g: number;

  @IsNumber()
  protein_g: number;

  @IsString()
  instructions: string;

  @IsString()
  summary: string;

  @IsNumber()
  readyInMinutes?: number;

  @IsNumber()
  servings: number;

  @IsString()
  dishType: string;

  @IsString()
  cuisine: string;

  @IsString()
  extentedIngredients: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RecipeIngredientDto)
  recipeIngredients: RecipeIngredientDto[];

}

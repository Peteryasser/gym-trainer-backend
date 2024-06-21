import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecipeIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  ingredientId: number;

  @IsNotEmpty()
  @IsString()
  ingredientName: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  unit: string;
}

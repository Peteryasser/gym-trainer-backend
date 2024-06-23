import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecipeIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  unit: string;
}

import { IsNumber } from 'class-validator';


export class MealNutritionsDto {
  
  @IsNumber()  
  total_calories_kcal: number;

  @IsNumber()  
  total_fats_g: number;

  @IsNumber()  
  total_protein_g: number;

  @IsNumber()  
  total_sugar_g: number;

}

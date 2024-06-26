import { IsString, IsNumber, IsArray } from 'class-validator';


export class CreateMealDto {
  @IsString()
  name: string;

  imageURL: string|null;

  total_calories_kcal: number;


  @IsString()
  description: string;


  @IsString()
  category: string;

  @IsArray()
  recipeIds?: number[];

}

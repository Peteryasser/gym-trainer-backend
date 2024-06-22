import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsArray,
    ValidateNested
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { RecipeIngredientDto } from './recipe-ingredient.dto';
  
  export class RecipeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    imageURL: string;

    @IsNotEmpty()
    @IsNumber()
    readyInMinutes: number;
  
    @IsNotEmpty()
    @IsNumber()
    calories_kcal: number;
  
    @IsNotEmpty()
    @IsNumber()
    fat_g: number;
  
    @IsNotEmpty()
    @IsNumber()
    sugar_g: number;
  
    @IsNotEmpty()
    @IsNumber()
    protein_g: number;
  
    @IsNotEmpty()
    @IsString()
    instructions: string;
  
    @IsNotEmpty()
    @IsString()
    summary: string;
  
    @IsNotEmpty()
    @IsBoolean()
    is_custom: boolean;

    @IsNotEmpty()
    @IsNumber()
    servings: number;

    @IsNumber()
    user_id: number;
  
    @IsNotEmpty()
    @IsString()
    dishType: string;
  
    @IsNotEmpty()
    @IsString()
    cuisine: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => RecipeIngredientDto)
    ingredients: RecipeIngredientDto[];
  }
  
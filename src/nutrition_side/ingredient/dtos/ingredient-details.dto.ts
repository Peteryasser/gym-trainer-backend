import { NutrientsDto } from "./nutrients.dto";
export class IngredientDetailsDTO {
    id: number;
    original: string;
    originalName: string;
    name: string;
    possibleUnits: string[];
    consistency: string;
    shoppingListUnits: string[];
    aisle: string;
    image: string;
    meta: string[];
    categoryPath: string[];
    nutrition: NutrientsDto[]
  }
  
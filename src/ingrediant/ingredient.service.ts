import { Injectable } from '@nestjs/common';
import { CSVReaderService } from 'src/Readers/csv_reader.service';
import { IngredientInfoDto } from 'src/dtos/ingredient.dto';

@Injectable()
export class IngredientService {
  private csvReader: CSVReaderService;

  constructor() {
    this.csvReader = new CSVReaderService();
  }

  async processIngredientsFile(filePath: string): Promise<IngredientInfoDto[]> {
    return await this.csvReader.processCSVFile(filePath, (fields: string[]) => ({
      id: parseInt(fields[1]), // Assuming id is in the second column
      name: fields[0] // Assuming name is in the first column
    }));
  }
}

// Call the function with the path to your CSV file
async function main() {
  const ingredientService = new IngredientService();
  const filePath = 'src/top-1k-ingredients.csv';
  const ingredients = await ingredientService.processIngredientsFile(filePath);
  console.log(ingredients);
  console.log('Number of ingredients:', ingredients.length);
}

main().catch(error => console.error(error));

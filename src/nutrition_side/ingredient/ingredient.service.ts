import { Injectable, NotFoundException } from '@nestjs/common';
import { CSVReaderService } from 'src/utils/Readers/csv_reader.service';
import { IngredientInfoDto } from 'src/nutrition_side/ingredient/dtos/ingredient.dto';

@Injectable()
export class IngredientService {
  private csvReader: CSVReaderService;

  constructor() {
    this.csvReader = new CSVReaderService();
  }

  async processIngredientsFile(filePath: string): Promise<IngredientInfoDto[]> {
    try {
      const ingredients = await this.csvReader.processCSVFile(filePath, (fields: string[]) => ({
        id: parseInt(fields[1]), // Assuming id is in the second column
        name: fields[0], // Assuming name is in the first column
      }));
      return ingredients;
    } catch (error) {
      // Handle errors here, e.g., log them or throw a custom exception
      throw new NotFoundException('Failed to process ingredients file');
    }
  }
}





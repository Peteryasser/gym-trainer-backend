import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
@Injectable()
export class ExerciseService {
  private readonly apiUrl = 'https://exercisedb.p.rapidapi.com';

  async getBackExercises(): Promise<any> {
    const headers = {
      'X-Rapidapi-Key': `${process.env.X_Rapidapi_Key}`,
      'X-Rapidapi-Host': `${process.env.X_Rapidapi_Host}`,
    };

    try {
      const response = await axios.get(`${this.apiUrl}/exercises?limit=10`, { headers });
      return response.data;
    } catch (error) {
      // Handle error (e.g., log it or throw an exception)
      console.error('Error fetching back exercises:', error.message);
      throw new Error('Failed to fetch back exercises');
    }
  }
}

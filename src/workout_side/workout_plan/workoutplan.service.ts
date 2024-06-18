import { Injectable } from '@nestjs/common';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });
@Injectable()
export class WorkoutPlanService {
  constructor() {}
}

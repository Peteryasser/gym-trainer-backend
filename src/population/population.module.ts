import { Module } from '@nestjs/common';
import { PopulationController } from './controller/population.controller';

@Module({
  controllers: [PopulationController]
})
export class PopulationModule {}

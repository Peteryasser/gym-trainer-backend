import {IsDateString } from 'class-validator';


export class getHistoryNutritionsDto {
  @IsDateString()
  start_date: Date

  @IsDateString()
  end_date: Date

}

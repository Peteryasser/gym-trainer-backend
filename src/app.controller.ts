import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import supabase from './app/supabaseClient';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    
  }

  @Get("/get")
  async getData(): Promise<string> {
    console.log(await supabase.from('countries').select('*'));
    return this.appService.getHello();
  }
}

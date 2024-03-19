import { Controller, Get, Post ,BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import supabase from './app/supabaseClient';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CLOUDINARY_EXERCISES_FOLDER_NAME } from './constants';
import { ExerciseService } from './exercise/exercise.service';
import { ImageService } from './image/image.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private cloudinary: CloudinaryService,
    private exerciseService: ExerciseService,
    private imageService:ImageService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    
  }

  @Get("/get")
  async getData(): Promise<string> {
    console.log(await supabase.from('countries').select('*'));
    return this.appService.getHello();
  }





  @Get("/testRapidAPIandCloudinary")
  async testRapidAPIandCloudinary(): Promise<string> {
    try {
      const exercises = await this.exerciseService.getBackExercises()
      const exercise = exercises[0]
      const url = exercise['gifUrl']
      console.log("url retreived >>>> ",url);
      const buffer = await this.imageService.fetchImage(url)
      this.uploadWorkoutImageToCloudinary(buffer)
      return 'Image from rapid api is uploaded to Cloudinary successfully!';

    } catch (error) {
      console.error('Failed at some point:', error.message);
      throw new BadRequestException('Failed to retrieve data from rapid API');
    }
  }

  

  @Get("/testRapidAPI")
  async testRapidAPI(): Promise<string> {
    try {
      return this.exerciseService.getBackExercises()
    } catch (error) {
      console.error('Failed to upload image to Cloudinary:', error.message);
      throw new BadRequestException('Failed to retrieve data from rapid API');
    }
  }



  @Get("/testCloudinary")
  async testCloudinary(): Promise<string> {
    try {
      const imageBuffer = await this.imageService.loadLocalTestImage( 'assets\\test_image.png');
      const imageUrl = await this.uploadWorkoutImageToCloudinary(imageBuffer);
      console.log('Image uploaded successfully:', imageUrl);
      return 'Image uploaded to Cloudinary successfully!';
    } catch (error) {
      console.error('Failed to upload image to Cloudinary:', error.message);
      throw new BadRequestException('Failed to upload image to Cloudinary.');
    }
  }

  async uploadWorkoutImageToCloudinary(imageBuffer:Buffer) {
    return await this.cloudinary.uploadImage(imageBuffer,CLOUDINARY_EXERCISES_FOLDER_NAME).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}

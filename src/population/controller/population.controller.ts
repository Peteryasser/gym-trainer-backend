import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';
import supabase from 'src/app/supabaseClient';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CLOUDINARY_EXERCISES_FOLDER_NAME } from 'src/constants';
import { ExerciseDTO } from 'src/dtos/exercise.dto';
import { ExerciseService } from 'src/exercise/exercise.service';
import { ImageService } from 'src/image/image.service';

@Controller('population')
export class PopulationController {
    constructor(
        private readonly appService: AppService,
        private cloudinary: CloudinaryService,
        private exerciseService: ExerciseService,
        private imageService:ImageService
        ) {}

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
  
  
  
    @Get("/populateDB")
    async populateDB(): Promise<string> {
      try {
        const exercises = await this.exerciseService.getAllExercises()
        for (const exercise of exercises) {
          const url = exercise['gifUrl']
          const buffer = await this.imageService.fetchImage(url)
          const newUrl = await this.uploadWorkoutImageToCloudinary(buffer)
          exercise['gifUrl'] = newUrl
          await this.exerciseService.createExercise(exercise)
        }
        console.log(" ============= DONE ===============");
        
        return 'Population of the exercises is done';
  
      } catch (error) {
        console.log(error);
        throw new BadRequestException('Failed at some point');
      }
    }
  
  
  
    
    @Get("/getAllExercise")
    async getAllExercise(): Promise<string> {
      try {
        return this.exerciseService.getAllExercises()
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
  
    @Post("/addDummyWorkout")
    async dummyWorkout(
      @Body() exerciseDTO:ExerciseDTO
    ): Promise<string> {
      try {
        await this.exerciseService.createExercise(exerciseDTO)
        return 'added successfully';
      } catch (error) {
        console.error('Error message:', error.message);
        throw new BadRequestException('Couldn\'t save to the backend');
      }
    }


    async uploadWorkoutImageToCloudinary(imageBuffer:Buffer) {
        return await this.cloudinary.uploadImage(imageBuffer,CLOUDINARY_EXERCISES_FOLDER_NAME).catch(() => {
          throw new BadRequestException('Invalid file type.');
        });
    }
    
}

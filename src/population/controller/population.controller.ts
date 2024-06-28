import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from '../../app.service';
import { CloudinaryService } from '../../utils/cloudinary/cloudinary.service';
import { CLOUDINARY_EXERCISES_FOLDER_NAME, CSV_ASSISTED_POPULATION } from '../../constants';
import { ExerciseDTO } from '../../workout_side/exercise/dtos/exercise.dto';
import { ExerciseService } from '../../workout_side/exercise/exercise.service';
import { ImageService } from '../../utils/image/image.service';
import { CSVReaderService } from '../../utils/Readers/csv_reader.service';
import { log } from 'console';

@Controller('population')
export class PopulationController {
    constructor(
        private readonly appService: AppService,
        private cloudinary: CloudinaryService,
        private exerciseService: ExerciseService,
        private imageService:ImageService,
        private csvReaderservice: CSVReaderService,
        ) {}


      
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
        var local_db = []

        if(CSV_ASSISTED_POPULATION){
          local_db = await this.csvReaderservice.processCSVFile(
            'exercises.csv', (fields: string[]) => ({
              idApi: fields[1],
              gifUrl: fields[2],
            }),',');
        }
                  
        for (const exercise of exercises) {
          const url = exercise['gifUrl'];
          const idApi = exercise['id'];
          let newUrl = url;
          if (CSV_ASSISTED_POPULATION) { // the condition for this if statement is in constants.ts
            const localExercise = local_db.find((ex) => {
              const idApiWithoutQuotes = idApi.replaceAll('"', '');
              const exIdApiWithoutQuotes = ex.idApi.replaceAll('"', '');
              return exIdApiWithoutQuotes === idApiWithoutQuotes});  
            if (localExercise) {
                newUrl = localExercise.gifUrl;                
            } else {
                const buffer = await this.imageService.fetchImage(url);
                newUrl = await this.uploadWorkoutImageToCloudinary(buffer);
            }
          } else {
              const buffer = await this.imageService.fetchImage(url);
              newUrl = await this.uploadWorkoutImageToCloudinary(buffer);
          }
          exercise['gifUrl'] = newUrl;
          await this.exerciseService.createExercise(exercise);
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

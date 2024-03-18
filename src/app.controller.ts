import { Controller, Get, Post ,BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import supabase from './app/supabaseClient';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import fs from 'fs';
import path from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private cloudinary: CloudinaryService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    
  }

  @Get("/get")
  async getData(): Promise<string> {
    console.log(await supabase.from('countries').select('*'));
    return this.appService.getHello();
  }


  @Get("/uploadToCloudinary")
  async testCloudinary(): Promise<string> {
    try {

      const filePath = path.resolve(__dirname, '..', 'assets', 'test_image.png');
      const fileBuffer = fs.readFileSync(filePath);

      // Create a Multer file object
      const file: Express.Multer.File = {
        fieldname: 'image',
        originalname: 'test_image.png',
        encoding: '7bit',
        mimetype: 'image/png',
        size: fileBuffer.length,
        buffer: fileBuffer,
        destination: '',
        filename: 'test_image.png',
        path: filePath,
        stream: fs.createReadStream(filePath), // Provide a readable stream for the file
      };
      // Call uploadImageToCloudinary function
      await this.uploadImageToCloudinary(file);

      return 'Image uploaded to Cloudinary successfully!';
    } catch (error) {
      throw new BadRequestException('Failed to upload image to Cloudinary.');
    }
  }

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs'; // Import Node.js 'fs' module
import fetch from 'node-fetch';
@Injectable()
export class ImageService {
    async loadLocalTestImage(path:string): Promise<Buffer> {
        try {
            // Read the image file from the 'assets' folder 
            const imagePath = path;
            const imageBuffer = fs.readFileSync(imagePath);
            return imageBuffer;
        } catch (error) {
            console.error('Failed to load local image:', error.message);
            throw new BadRequestException('Failed to load local image.');
        }
    }

    async fetchImage(url: string): Promise<Buffer> {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return buffer;
    }

}

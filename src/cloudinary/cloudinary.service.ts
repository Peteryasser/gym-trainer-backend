import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {


  async uploadImage(buffer: Buffer, folderName:string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const stream = toStream(buffer);
      const uploadStream = v2.uploader.upload_stream(
        {
          folder: folderName, // Specify your desired folder in Cloudinary
        },
        (error, result) => {
          if (error) {
            reject(new Error('Image upload failed'));
          } else {
            resolve(result.secure_url); // Get the secure URL from the result
          }
        }
      );

      stream.pipe(uploadStream);
    });
  }
}

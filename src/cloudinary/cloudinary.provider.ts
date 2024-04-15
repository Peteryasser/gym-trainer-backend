import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

v2.config({
  cloud_name:`${process.env.CLOUDINARY_CLOUD_NAME}`,
  api_key:`${process.env.CLOUDINARY_API_KEY}`,
  api_secret:`${process.env.CLOUDINARY_API_SECRET}`,
});

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useValue: v2,
};

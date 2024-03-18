import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from '../constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dlvzqmmld',
      api_key: '239546622745643',
      api_secret: 'WD4DjdBg7SjbOl52DYqvY-c6nt4',
    });
  },
};  
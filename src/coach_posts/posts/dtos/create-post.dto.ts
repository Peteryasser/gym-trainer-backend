import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MultimediaDto } from '../../../coach_posts/multimedia/dtos/multimedia.dto';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MultimediaDto)
  multimedia: MultimediaDto[];
}

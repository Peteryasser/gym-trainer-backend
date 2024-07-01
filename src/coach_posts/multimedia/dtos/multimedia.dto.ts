import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MultimediaTypeEnum } from '../enum/multimedia-type.enum';

export class MultimediaDto {
  @IsNotEmpty()
  @IsString()
  multimediaUrl: string;

  @IsNotEmpty()
  @IsEnum(MultimediaTypeEnum)
  type: MultimediaTypeEnum;
}

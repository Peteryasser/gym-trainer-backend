import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import { SocialMediaPlatformEnum } from '../enums/social-media-platform.enum';

export class CreateSocialMediaDto {
  @IsNotEmpty()
  @IsString()
  handle: string;

  @IsNotEmpty()
  @IsEnum(SocialMediaPlatformEnum)
  platform: SocialMediaPlatformEnum;
}

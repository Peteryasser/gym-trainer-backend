import { IsEnum, IsString, IsOptional } from 'class-validator';
import { SocialMediaPlatformEnum } from '../enums/social-media-platform.enum';

export class UpdateSocialMediaDto {
  @IsOptional()
  @IsString()
  handle: string;

  @IsOptional()
  @IsEnum(SocialMediaPlatformEnum)
  platform: SocialMediaPlatformEnum;
}

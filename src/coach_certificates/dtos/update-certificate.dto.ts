import { IsOptional, IsString } from 'class-validator';

export class UpdateCertificateDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  certificateUrl: string;
}

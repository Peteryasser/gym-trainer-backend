import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCertificateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  certificateUrl: string;
}

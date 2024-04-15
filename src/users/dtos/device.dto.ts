import { IsNotEmpty, IsString } from 'class-validator';

export class DeviceDto {
  @IsNotEmpty()
  @IsString()
  fcmToken: string;
}

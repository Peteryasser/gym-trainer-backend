import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UserType } from './users/user-type.enum';

@Injectable()
export class UserTypeValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!(value in UserType)) {
      throw new BadRequestException('Invalid userType parameter');
    }
    return value;
  }
}

import { User } from '../../entity/user.entity';

export class UserProfileDto {
  id: number;
  name: string;
  profilePictureUrl: string;
  gender: string;
  age: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.fullName;
    this.profilePictureUrl = user.profilePictureUrl;
    this.gender = user.gender;
    this.age = user.age;
  }
}

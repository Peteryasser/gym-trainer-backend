import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(
    email: string,
    throwException: boolean = true,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user && throwException) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUsername(
    username: string,
    throwException: boolean = true,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user && throwException) throw new NotFoundException('User not found');
    return user;
  }

  async findOneById(
    id: number,
    throwException: boolean = true,
  ): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user && throwException) throw new NotFoundException('User not found');
    return user;
  }

  async create(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async update(id: number, userInfo: Partial<User>): Promise<UpdateResult> {
    await this.findOneById(id);

    return await this.usersRepository.update(id, userInfo);
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected == 0) throw new NotFoundException('User not found');
  }
}

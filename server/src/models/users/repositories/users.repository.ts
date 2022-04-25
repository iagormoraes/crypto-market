import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../interfaces/user.inteface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserMapper } from '../mappers/create-user.mapper';

export class UsersRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(userDto);

    return new CreateUserMapper().toDomain(user);
  }
}

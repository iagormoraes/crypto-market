import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../interfaces/user.inteface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';

export class UsersRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) return null;

    return new UserMapper().toDomain(user);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(userDto);

    return new UserMapper().toDomain(user);
  }
}

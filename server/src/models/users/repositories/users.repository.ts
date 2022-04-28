import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { User } from '../interfaces/user.inteface';
import { UserMapper } from '../mappers/user.mapper';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

import { RoleEnumValue } from '../../roles/role.enum';

export class UsersRepository {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find({ role: RoleEnumValue.User });

    return users.map((user) => {
      const { password, ...result } = new UserMapper().toDomain(user);

      return result as User;
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) return null;

    return new UserMapper().toDomain(user);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(userDto);

    return new UserMapper().toDomain(user);
  }

  async update(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findOneAndUpdate(
      { _id: updateUserDto.id },
      updateUserDto,
      {
        new: true,
      },
    );

    return new UserMapper().toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findOneAndDelete({ _id: id });
  }
}

import { Injectable } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.inteface';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}

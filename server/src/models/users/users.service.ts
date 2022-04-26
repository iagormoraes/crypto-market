import { Injectable } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.inteface';

import { UsersSpreadService } from '../users-spread/users-spread.service';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private userSpreadService: UsersSpreadService,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);

    await this.userSpreadService.create({
      userId: user.id,
      spreadPercentage: 2,
    });

    return user;
  }
}

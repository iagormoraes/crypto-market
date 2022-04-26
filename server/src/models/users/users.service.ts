import { Injectable } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.inteface';

import { UsersSpreadService } from '../users-spread/users-spread.service';
import { UserSpreadMapper } from '../users-spread/mappers/user-spread.mapper';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private userSpreadService: UsersSpreadService,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async profile(user: User) {
    const userSpread = await this.userSpreadService.findByUserId(user.id);

    return {
      user,
      spread: new UserSpreadMapper().toDto(userSpread),
    };
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

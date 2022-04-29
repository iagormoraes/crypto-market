import { Injectable } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './interfaces/user.inteface';

import { UsersSpreadService } from '../users-spread/users-spread.service';
import { UpdateUserSpreadDto } from '../users-spread/dtos/update-user-spread.dto';
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
    const { password, ...rest } = user as User;

    return {
      user: rest,
      spread: new UserSpreadMapper().toDto(userSpread),
    };
  }

  async index() {
    const users = await this.userRepository.findAll();

    return Promise.all(
      users.map(async (user) => {
        const userSpread = await this.userSpreadService.findByUserId(user.id);

        return {
          user,
          spread: new UserSpreadMapper().toDto(userSpread),
        };
      }),
    );
  }

  async create(createUserDto: CreateUserDto, spreadPercentage = 2) {
    const { password, ...user } = (await this.userRepository.create(
      createUserDto,
    )) as User;

    const userSpread = await this.userSpreadService.create({
      userId: user.id,
      spreadPercentage,
    });

    return {
      user,
      spread: new UserSpreadMapper().toDto(userSpread),
    };
  }

  async update(updateUserDto: UpdateUserDto) {
    const { password, ...user } = (await this.userRepository.update(
      updateUserDto,
    )) as User;
    const userSpread = await this.userSpreadService.findByUserId(user.id);

    return {
      user,
      spread: new UserSpreadMapper().toDto(userSpread),
    };
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
    await this.userSpreadService.deleteByUserId(id);
  }

  async updateSpread(id: string, updateUserDto: UpdateUserSpreadDto) {
    const { password, ...user } = (await this.userRepository.findById(
      id,
    )) as User;
    const userSpread = await this.userSpreadService.updateByUserId(
      user.id,
      updateUserDto.spread,
    );

    return {
      user,
      spread: new UserSpreadMapper().toDto(userSpread),
    };
  }
}

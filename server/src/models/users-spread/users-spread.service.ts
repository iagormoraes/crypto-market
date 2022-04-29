import { Injectable } from '@nestjs/common';

import { UserSpreadRepository } from './repositories/user-spread.repository';
import { CreateUserSpreadDto } from './dtos/create-user-spread.dto';

@Injectable()
export class UsersSpreadService {
  constructor(private userSpreadRepository: UserSpreadRepository) {}

  findByUserId(userId: string) {
    return this.userSpreadRepository.findByUserId(userId);
  }

  create(createUserSpreadDto: CreateUserSpreadDto) {
    return this.userSpreadRepository.create(createUserSpreadDto);
  }

  updateByUserId(id: string, spread: number) {
    return this.userSpreadRepository.updateByUserId(id, spread);
  }

  deleteByUserId(id: string) {
    return this.userSpreadRepository.deleteByUserId(id);
  }
}

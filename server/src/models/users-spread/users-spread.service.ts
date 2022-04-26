import { Injectable } from '@nestjs/common';

import { UserSpreadRepository } from './repositories/user-spread.repository';
import { CreateUserSpreadDto } from './dtos/create-user-spread.dto';

@Injectable()
export class UsersSpreadService {
  constructor(private userSpreadRepository: UserSpreadRepository) {}

  create(createUserSpreadDto: CreateUserSpreadDto) {
    return this.userSpreadRepository.create(createUserSpreadDto);
  }
}

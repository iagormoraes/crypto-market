import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { UserSpread } from '../interfaces/user-spread.interface';
import { CreateUserSpreadDto } from '../dtos/create-user-spread.dto';
import { UserSpreadMapper } from '../mappers/user-spread.mapper';

export class UserSpreadRepository {
  constructor(
    @Inject('USER_SPREAD_MODEL')
    private userSpreadModel: Model<UserSpread>,
  ) {}

  async create(createUserSpreadDto: CreateUserSpreadDto): Promise<UserSpread> {
    const userSpread = await this.userSpreadModel.create(createUserSpreadDto);

    return new UserSpreadMapper().toDomain(userSpread);
  }
}

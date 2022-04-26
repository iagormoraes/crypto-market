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

  async findByUserId(userId: string): Promise<UserSpread | null> {
    const userSpread = await this.userSpreadModel.findOne({ userId });

    if (!userSpread) return null;

    return new UserSpreadMapper().toDomain(userSpread);
  }

  async create(createUserSpreadDto: CreateUserSpreadDto): Promise<UserSpread> {
    const userSpread = await this.userSpreadModel.create(createUserSpreadDto);

    return new UserSpreadMapper().toDomain(userSpread);
  }

  async deleteByUserId(id: string): Promise<void> {
    await this.userSpreadModel.findOneAndDelete({ userId: id });
  }
}

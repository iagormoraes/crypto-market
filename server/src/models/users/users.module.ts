import { Module } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';

import { DatabaseModule } from '../database/database.module';
import { UsersSpreadModule } from '../users-spread/users-spread.module';

@Module({
  providers: [UsersService, UsersRepository, ...usersProviders],
  imports: [DatabaseModule, UsersSpreadModule],
  exports: [UsersService],
})
export class UsersModule {}

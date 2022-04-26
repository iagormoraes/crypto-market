import { Module } from '@nestjs/common';

import { UsersSpreadService } from './users-spread.service';
import { UserSpreadRepository } from './repositories/user-spread.repository';
import { usersSpreadProvider } from './users-spread.provider';

import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UsersSpreadService, UserSpreadRepository, ...usersSpreadProvider],
  controllers: [],
  imports: [DatabaseModule],
  exports: [UsersSpreadService],
})
export class UsersSpreadModule {}

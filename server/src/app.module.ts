import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UsersController } from './models/users/users.controller';
import { UsersModule } from './models/users/users.module';

import { AuthController } from './models/auth/auth.controller';
import { AuthModule } from './models/auth/auth.module';
import { DatabaseService } from './models/database/database.service';
import { DatabaseModule } from './models/database/database.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [DatabaseService],
})
export class AppModule {}

import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { UsersController } from './models/users/users.controller';
import { UsersModule } from './models/users/users.module';

import { AuthController } from './models/auth/auth.controller';
import { AuthModule } from './models/auth/auth.module';
import { DatabaseService } from './models/database/database.service';
import { DatabaseModule } from './models/database/database.module';

import { ResponseInterceptor } from './interceptors/response-interceptor.service';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    DatabaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

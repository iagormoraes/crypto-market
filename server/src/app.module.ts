import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersController } from './models/users/users.controller';
import { UsersModule } from './models/users/users.module';

import { AuthController } from './models/auth/auth.controller';
import { AuthModule } from './models/auth/auth.module';

import { DatabaseService } from './models/database/database.service';
import { DatabaseModule } from './models/database/database.module';

import { ResponseInterceptor } from './interceptors/response-interceptor.service';
import { UsersSpreadModule } from './models/users-spread/users-spread.module';

import { CryptoGateway } from './models/crypto/crypto.gateway';
import { CryptoModule } from './models/crypto/crypto.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    UsersSpreadModule,
    CryptoModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
    DatabaseService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}

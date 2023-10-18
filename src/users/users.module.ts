import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthService } from './auth.services';
import { CurrentUserInterceptors } from './interceptors/user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMidlleWare } from 'src/middleware/current-user.middleware';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]) ],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptors
    // }
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMidlleWare).forRoutes('*')
  }
}

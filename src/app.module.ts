import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entity/user.entity';
import { UserReports } from './report/entity/report.entity';
//import cookieSession from 'cookie-session';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity, UserReports],
      synchronize: true
    }),
    UsersModule, 
    ReportModule],




    
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer){
  //   consumer.apply(
  //     cookieSession({
  //       keys: ['nonsense']
  //     })
  //   )
  //   .forRoutes('*')
  // }
}

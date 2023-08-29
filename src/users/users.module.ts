import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AuthService } from './auth.services';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]) ],
  controllers: [UsersController],
  providers: [UsersService, AuthService]
})
export class UsersModule {}

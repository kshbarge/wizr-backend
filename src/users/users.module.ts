import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';

=======
import { User, UserSchema } from './user.schema';
import { RedisService } from '../redis/redis.service';
@Module({
    imports: [
       MongooseModule.forFeature([
         {
           name: User.name,
           schema: UserSchema,
         },
       ]),
  ],

  controllers: [UserController],
  providers: [UserService, RedisService],
  exports: [UserService],
})
export class UsersModule {}

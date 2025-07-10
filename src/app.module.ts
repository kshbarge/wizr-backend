import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { RedisService } from './redis/redis.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wizr'),
    UsersModule,
  ],
  providers: [RedisService],
})
export class AppModule {}

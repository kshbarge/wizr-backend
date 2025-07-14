import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}
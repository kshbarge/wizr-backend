import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://nc-Wizr:LZBlEA21sYchn3aA@wizr.ykawvuv.mongodb.net/`,
    ),
    UsersModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}

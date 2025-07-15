import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';
import { VideoModule } from './video/video.module';
import { ChatModule } from './chat/chat.module';




@Module({
  imports: [
    

    MongooseModule.forRoot(`mongodb+srv://nc-Wizr:LZBlEA21sYchn3aA@wizr.ykawvuv.mongodb.net/`),  
    UsersModule, VideoModule, ChatModule                                                                              


  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
})
export class AppModule {}

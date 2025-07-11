import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/users.module';
import { ChatModule } from './chat/chat.module'



@Module({
  imports: [
    

    MongooseModule.forRoot(`mongodb+srv://nc-Wizr:LZBlEA21sYchn3aA@wizr.ykawvuv.mongodb.net/`),  
    UserModule,                                                                              

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

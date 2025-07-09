import { Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


/*@Controller('chat')
export class ChatController {
  //constructor(private readonly appService: AppService) {}
  @Get()
  findAll(@Res() res: Response): string {
    return res.send('<p>Heya world</p>');
  }
}*/

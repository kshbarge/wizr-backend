import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'end points {/users/skills}---> list of skills data /n || {/users}--> live data from DB || {/users/test}---> dummy data from test database will also produce a console log for reference';
  }
}

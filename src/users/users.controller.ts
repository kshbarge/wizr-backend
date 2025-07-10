import { Controller, Patch, Param, Post, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { RedisService } from '../redis/redis.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly redisService: RedisService,
  ) {}

  @Patch(':id/online')
  updateOnlineStatus(@Param('id') id: string) {
    return this.usersService.setUserOnline(id);
  }

  @Post(':id/online')
  addToQueue(@Param('id') id: string) {
    return this.redisService.addUserToQueue(id);
  }

  @Delete(':id/online')
  removeFromQueue(@Param('id') id: string) {
    return this.redisService.removeUserFromQueue(id);
  }

  @Get('online')
  getAllUsers() {
    return this.redisService.getQueueUsers();
  }

  @Post(':id/match')
  findMatch(@Param('id') id: string) {
    return this.redisService.findMatch(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RedisService } from '../redis/redis.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  async createUser(@Body() newUser: User): Promise<User> {
    return this.userService.create(newUser);
  }

  @Patch(':id/online')
  updateOnlineStatus(@Param('id') id: string) {
    return this.userService.setUserOnline(id);
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
  getAllOnlineUsers() {
    return this.redisService.getQueueUsers();
  }

  @Post(':id/match')
  findMatch(@Param('id') id: string) {
    return this.redisService.findMatch(id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RedisService } from '../redis/redis.service';
import { User } from './user.schema';

import customHook from 'src/utils/customHook';
import fetchAllUsers from 'src/utils/fetchAllUsers';
import fetchAllSkills from 'src/utils/fetchAllSkills';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async getAllUsers() {
    const result = await fetchAllUsers();
    return result;
  }

  @Get('skills')
  async getAllSkills() {
    const result = await fetchAllSkills();
    return result;
  }

  @Get('test')
  async invokeCustomHook() {
    const result = await customHook();
    return result;
  }

  @Patch('update')
  async updateUser(@Body() body: { email: string; updateData: Partial<User> }) {
    await this.userService.updateUser(body.email, body.updateData);
    return { message: 'User updated successfully' };
  }

  @Post('create')
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

  @Get('skill-match/:id')
  getSkillMatch(@Param('id') id: string) {
    return this.redisService.findSkillMatch(id);
  }
}

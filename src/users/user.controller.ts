import { Controller, Get, Post, Body, Param, Put, } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema'; 

import customHook from 'src/utils/customHook';
import fetchAllUsers from 'src/utils/fetchAllUsers';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get()
  async getAllUsers() {
    const result = await fetchAllUsers();
    return result; 
  }

  @Get('test')  
  async invokeCustomHook() {
    const result = await customHook();
    return result; 
  }


  
  @Post()
  async createUser(@Body() newUser: User): Promise<User> {
    return this.userService.create(newUser);
  }

 


 
 
}
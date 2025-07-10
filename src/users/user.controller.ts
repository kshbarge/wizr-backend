import { Controller, Get, Post, Body, Param, Put, } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema'; 

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  


  
  @Post()
  async createUser(@Body() newUser: User): Promise<User> {
    return this.userService.create(newUser);
  }

 


 
 
}
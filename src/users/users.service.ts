import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  setUserOnline(id: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, { isOnline: true }, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      });
  }
}

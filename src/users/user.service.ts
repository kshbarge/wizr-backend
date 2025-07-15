import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import updateUsers from 'src/utils/updateUser';
import { UserUpdateData } from 'src/utils/userUpdateData';
import { MongoClient } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(user: User): Promise<User> {
    if (typeof user.DOB === 'string') {
      user.DOB = new Date(user.DOB);
    }

    const client = new MongoClient(process.env.MONGODB_URI!);
    try {
      await client.connect();
      const db = client.db('WIZR');
      const collection = db.collection<User>('Users');

      await collection.insertOne(user);
      return user;
    } finally {
      await client.close();
    }
  }

  async updateUser(email: string, updateData: UserUpdateData): Promise<void> {
    const collection = this.userModel.db.collection<User>('Users');
    await updateUsers(collection, email, updateData);
  }

  async setUserOnline(id: string): Promise<User> {
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

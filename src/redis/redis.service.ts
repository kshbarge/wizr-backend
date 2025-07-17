import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  onModuleInit() {
    this.client = new Redis();

    this.client.on('connect', () => {
      console.log('[Redis] connected');
    });

    this.client.on('error', (err) => {
      console.error('[Redis] error:', err);
    });
  }

  addUserToQueue(userId: string) {
    return this.client
      .sadd('onlineUsers', userId)
      .then((result) => {
        return this.userModel
          .findByIdAndUpdate(userId, { isOnline: true })
          .then(() => {
            return result;
          });
      })
      .catch((err) => {
        console.error('Redis error:', err);
      });
  }

  removeUserFromQueue(userId: string) {
    return this.client
      .srem('onlineUsers', userId)
      .then((result) => {
        return this.userModel
          .findByIdAndUpdate(userId, { isOnline: false })
          .then(() => {
            return result;
          });
      })
      .catch((err) => {
        console.error('Redis error:', err);
      });
  }

  getQueueUsers() {
    return this.client
      .smembers('onlineUsers')
      .then((users) => {
        return users;
      })
      .catch((err) => {
        console.error('Redis error:', err);
      });
  }

  findSkillMatch(userId: string) {
    return this.userModel.findById(userId).then((userA) => {
      if (!userA || typeof userA.learning !== 'string') {
        throw new Error('User not found or invalid learning field');
      }

      const learning = userA.learning.trim().toLowerCase();

      return this.client.smembers('onlineUsers').then((onlineUsers) => {
        const otherUserIds = onlineUsers.filter((id) => id !== userId);

        return this.userModel
          .find({ _id: { $in: otherUserIds } })
          .lean()
          .then((candidates) => {
            const match = candidates.find((userB) => {
              if (!userB.teaching || typeof userB.teaching !== 'string') {
                return false;
              }

              const teachingSkills = userB.teaching
                .split(',')
                .map((s) => s.trim().toLowerCase());

              return teachingSkills.includes(learning);
            });

            return match || null;
          });
      });
    });
  }
}

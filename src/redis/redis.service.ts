import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis();
    console.log('Redis connected');
  }

  addUserToQueue(userId: string) {
    return this.client
      .sadd('onlineUsers', userId)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error('Redis error:', err);
      });
  }

  removeUserFromQueue(userId: string) {
    return this.client
      .srem('onlineUsers', userId)
      .then((result) => {
        return result;
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

  findMatch(userId: string) {
    return this.client
      .smembers('onlineUsers')
      .then((users) => {
        const match = users.find((id) => id !== userId);
        if (match) {
          return match;
        } else {
          return null;
        }
      })
      .catch((err) => {
        console.error('Redis error:', err);
      });
  }
}

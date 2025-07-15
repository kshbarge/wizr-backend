import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import TestAddUsers from './utils/TestAddUsers';

dotenv.config();

interface User {
  username: string;
  password: string;
  name: string;
  email: string;
  DOB: Date;
  avatar_img_url?: string;
  language?: string;
  timezone?: string;
  skills?: string[];
  learning?: string[];
  isOnline?: boolean;
}

describe('addUsers Function', () => {
  let client: MongoClient;
  let database: any;

  const testUser: User = {
    username: 'testuser234',
    password: 'testpass',
    name: 'Test User',
    email: 'testuser@example.com',
    DOB: new Date('1990-01-01'),
    skills: ['testing', 'coding'],
    learning: ['typescript'],
    isOnline: false,
  };

  beforeAll(async () => {
    const dbUrl = process.env.MONGODB_URI;
    if (!dbUrl) throw new Error('DATABASE_URL is not defined');

    client = new MongoClient(dbUrl);
    await client.connect();
    database = client.db('WIZR');
  });

  afterAll(async () => {
    if (client) {
      await database
        .collection('Test')
        .deleteOne({ username: testUser.username });
      await client.close();
    }
  });

  test('should insert a user successfully', async () => {
    await TestAddUsers(testUser);

    const insertedUser = await database
      .collection('Test')
      .findOne({ username: testUser.username });
    expect(insertedUser).not.toBeNull();
    expect(insertedUser?.email).toBe(testUser.email);
    expect(insertedUser?.name).toBe(testUser.name);
  });
});

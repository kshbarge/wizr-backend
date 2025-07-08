import * as dotenv from 'dotenv';

dotenv.config();

import { MongoClient } from 'mongodb';

describe('Database Connection', () => {

  
  let client: MongoClient;

  beforeAll(async () => {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in env variables');
    }
    
    client = new MongoClient(process.env.DATABASE_URL);
    await client.connect();
    const db = client.db('WIZR');
    const collections = await db.listCollections().toArray();
    console.log('Collections in WIZR:', collections.map(data => data.name));
    
    
    const usersCollection = db.collection('Users');
    const users = await usersCollection.find().toArray();
    
    console.log('Documents in Users collection:');
    console.log(users);
  });
  
  afterAll(async () => {
    await client.close();
  });
  
  it('connects successfully', () => {
    
    expect(client).toBeDefined();
  
  });
});
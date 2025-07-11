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
    
    //check user data
    const usersCollection = db.collection('Users');
    const users = await usersCollection.find().toArray();
     //check skills data
    const skillsCollection = db.collection('Skills');
    const skills = await skillsCollection.find().toArray();
    
    console.log('Documents in Users collection:', users);
    console.log('Documents in Skills collection:',JSON.stringify(skills, null, 2));
  });
  
  afterAll(async () => {
    await client.close();
  });
  
  it('connects successfully', () => {
    
    expect(client).toBeDefined();
  
  });
});
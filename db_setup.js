import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Mongoose connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting mongoose:', err);
  });

const client = new MongoClient(process.env.MONGODB_URI);

async function listCollections() {
  try {
    await client.connect();
    const database = client.db('WIZR');
    const collections = await database.listCollections().toArray();
    console.log('Collections in database:');
    collections.forEach((data) => {
      console.log(data.name);
    });
  } catch (err) {
    console.error('Error listing collections:', err);
  } finally {
    await client.close();
  }
}

listCollections();

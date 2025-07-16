import { MongoClient } from 'mongodb';

let client: MongoClient;
async function fetchAllSkills() {
  try {
    const dbUrl = process.env.MONGODB_URI;
    if (!dbUrl) throw new Error('DATABASE_URL is not defined');

    client = new MongoClient(dbUrl);
    await client.connect();
    const database = client.db('WIZR');

    const users = await database.collection('Skills').find().toArray();

    await client.close();

    return users;
  } catch (error) {
    if (client) await client.close();
    throw error;
  }
}

export default fetchAllSkills;

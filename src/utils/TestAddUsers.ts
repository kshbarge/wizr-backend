import { MongoClient, Db, Collection } from 'mongodb';

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

async function TestAddUsers(user: User) {
    const dbUrl = `mongodb+srv://nc-Wizr:LZBlEA21sYchn3aA@wizr.ykawvuv.mongodb.net/`

    const client = new MongoClient(dbUrl)
    try {
        await client.connect()
        const db: Db = client.db('WIZR')
        const collection: Collection<User> = db.collection('Users')
        
        await collection.insertOne(user);
    console.log('User added successfully:', user.username, ' to test data');
    }
    finally {
        await client.close()
    }
    
}

export default TestAddUsers
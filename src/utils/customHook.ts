// import { MongoClient } from 'mongodb';

// import TestAddUsers from './TestAddUsers';

// let client: MongoClient;

// interface User {
//   username: string;
//   password: string;
//   name: string;
//   email: string;
//   DOB: Date;
//   avatar_img_url?: string;
//   language?: string;
//   timezone?: string;
//   skills?: string[];
//   learning?: string[];
//   isOnline?: boolean;
// }

// async function customHook() {
//   let database: any;

//   const testUser: User = {
//     username: 'testuser234',
//     password: 'testpass',
//     name: 'Test User',
//     email: 'testuser@example.com',
//     DOB: new Date('1990-01-01'),
//     skills: ['testing', 'coding'],
//     learning: ['typescript'],
//     isOnline: false,
//   };

//   try {
//     client = new MongoClient(process.env.MONGODB_URI!);
//     await client.connect();
//     database = client.db('WIZR');

//     await TestAddUsers(testUser);

//     const docs = await database.collection('Users').find().toArray();
//     console.log('Documents in Test collection:', docs);

//     await database
//       .collection('Users')
//       .deleteOne({ username: testUser.username });

//     await client.close();

//     return {
//       success: true,
//       message: 'Custom hook executed successfully',
//       data: docs,
//     };
//   } catch (err) {
//     if (client) await client.close();
//     throw err;
//   }
// }

// export default customHook;

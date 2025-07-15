import { Collection, Db, MongoClient } from 'mongodb';
import { User } from 'src/users/user.schema';
import { UserUpdateData } from './userUpdateData';


async function updateUsers(
collection: Collection<User>, email: string, updateData: UserUpdateData): Promise<void> {
 

  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db: Db = client.db('WIZR'); 
    const collection: Collection<User> = db.collection('Users'); 


    const filteredUpdateData = Object.fromEntries(
      Object.entries(updateData).filter(([_, v]) => v != null)
    );

   
    const existingUser = await collection.findOne({ email });
    if (!existingUser) {
      console.log(`No user found with email: ${email}`);
      return;
    }

 
    const result = await collection.updateOne({ email }, { $set: filteredUpdateData });
    if (result.modifiedCount === 0) {
      console.log('No user was updated.');
    } else {
      console.log('User updated.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await client.close();
  }
}

export default updateUsers;

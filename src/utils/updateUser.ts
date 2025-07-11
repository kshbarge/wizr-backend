import { Collection } from 'mongodb';


interface User {
  _id?: string; 
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


async function updateUser(
  collection: Collection<User>,
  email: string,
  updateData: Partial<User>
): Promise<void> {
  try {
    const filter = { email: email }; 
    const updateDoc = {
      $set: updateData,
    };

    const result = await collection.updateOne(filter, updateDoc);

    if (!result) {
      console.log('No user found.');
    } else {
      console.log('User updated.');
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}
export default updateUser
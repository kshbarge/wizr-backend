import { User } from 'src/users/user.schema';

export type UserUpdateData = Omit<Partial<User>, '_id'>;




  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Users' }) 
export class User extends Document {
  static username(arg0: string, username: any, arg2: string) {
    throw new Error('Method not implemented.');
  }
  @Prop()
  
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  DOB: Date;

  @Prop()
  avatar_img_url?: string;

  @Prop()
  language?: string;

  @Prop()
  timezone?: string;

  @Prop()
  teaching?: string;

  @Prop()
  learning?: string;

  @Prop({ default: false })
  isOnline?: boolean;
}

export interface User extends Document {
  username: string;
  password: string;
  name: string;
  email: string;
  DOB: Date;
  avatar_img_url?: string;
  language?: string;
  timezone?: string;
  teaching?: string;
  learning?: string;
  isOnline?: boolean;
}


export const UserSchema = SchemaFactory.createForClass(User);
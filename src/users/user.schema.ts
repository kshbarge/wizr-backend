


  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Users' }) 
export class User extends Document {
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

  @Prop([String])
  skills?: string[];

  @Prop([String])
  learning?: string[];

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
  skills?: string[];
  learning?: string[];
  isOnline?: boolean;
}


export const UserSchema = SchemaFactory.createForClass(User);
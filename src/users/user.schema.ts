import { Schema, Document } from "mongoose";

export const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    DOB: { type: Date, required: true },
    avatar_img_url: { type: String },
    language: { type: String },
    timezone: { type: String },
    skills: { type: [String] },
    learning: { type: [String] },
    isOnline: { type: Boolean, default: false },
  });
  
  
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
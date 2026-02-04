import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: 10000 })
  money: number;

  @Prop({ default: 1 })
  currentDay: number;

  @Prop({ default: 480 }) // 8 hours in minutes
  timeRemainingToday: number;

  @Prop({ default: Date.now })
  lastActiveAt: Date;

  @Prop({ default: 50 }) // Player's training skill level
  trainerSkillLevel: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

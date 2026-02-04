import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HorseDocument = Horse & Document;

// Mongoose schemas for nested objects
@Schema({ _id: false })
class GenePair {
  @Prop({ required: true, type: [Number] })
  value: [number, number];
}

@Schema({ _id: false })
class GeneMap {
  @Prop({ type: [Number], required: true })
  strength: [number, number];
  
  @Prop({ type: [Number], required: true })
  speed: [number, number];
  
  @Prop({ type: [Number], required: true })
  agility: [number, number];
  
  @Prop({ type: [Number], required: true })
  balance: [number, number];
  
  @Prop({ type: [Number], required: true })
  stamina: [number, number];
  
  @Prop({ type: [Number], required: true })
  movement: [number, number];
  
  @Prop({ type: [Number], required: true })
  tempo: [number, number];
  
  @Prop({ type: [Number], required: true })
  bravery: [number, number];
  
  @Prop({ type: [Number], required: true })
  competitiveness: [number, number];
  
  @Prop({ type: [Number], required: true })
  flexibility: [number, number];
  
  @Prop({ type: [Number], required: true })
  intelligence: [number, number];
  
  @Prop({ type: [Number], required: true })
  loyalty: [number, number];
  
  @Prop({ type: [Number], required: true })
  sociability: [number, number];
  
  @Prop({ type: [Number], required: true })
  stolidity: [number, number];
}

@Schema({ _id: false })
class TrainingLevels {
  @Prop({ default: 0 })
  strength: number;
  
  @Prop({ default: 0 })
  speed: number;
  
  @Prop({ default: 0 })
  agility: number;
  
  @Prop({ default: 0 })
  balance: number;
  
  @Prop({ default: 0 })
  stamina: number;
  
  @Prop({ default: 0 })
  movement: number;
  
  @Prop({ default: 0 })
  tempo: number;
  
  @Prop({ default: 0 })
  bravery: number;
  
  @Prop({ default: 0 })
  competitiveness: number;
  
  @Prop({ default: 0 })
  flexibility: number;
  
  @Prop({ default: 0 })
  intelligence: number;
  
  @Prop({ default: 0 })
  loyalty: number;
  
  @Prop({ default: 0 })
  sociability: number;
  
  @Prop({ default: 0 })
  stolidity: number;
}

@Schema({ _id: false })
class MentalState {
  @Prop({ required: true })
  personality: string;
  
  @Prop({ required: true })
  mood: string;
  
  @Prop()
  previousMood?: string;
  
  @Prop()
  previousSkill?: string;
  
  @Prop({ default: 0 })
  fatigue: number;
}

@Schema({ _id: false })
class SatisfactionLevel {
  @Prop({ default: 0 })
  current: number;
  
  @Prop({ default: 0 })
  required: number;
}

@Schema({ _id: false })
class Satisfaction {
  @Prop({ type: SatisfactionLevel, default: () => ({ current: 0, required: 0 }) })
  exercise: SatisfactionLevel;
  
  @Prop({ type: SatisfactionLevel, default: () => ({ current: 0, required: 0 }) })
  stimulation: SatisfactionLevel;
  
  @Prop({ type: SatisfactionLevel, default: () => ({ current: 100, required: 80 }) })
  nutrition: SatisfactionLevel;
  
  @Prop({ type: SatisfactionLevel, default: () => ({ current: 0, required: 0 }) })
  socialization: SatisfactionLevel;
}

@Schema({ _id: false })
class Bond {
  @Prop({ required: true })
  personId: string;
  
  @Prop({ default: 0 })
  level: number;
  
  @Prop({ default: Date.now })
  lastInteraction: Date;
}

@Schema({ _id: false })
class ParentInfo {
  @Prop({ required: true })
  id: string;
  
  @Prop({ required: true })
  name: string;
}

@Schema({ timestamps: true })
export class Horse {
  @Prop({ required: true, unique: true })
  horseId: number;
  
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, enum: ['stallion', 'mare', 'gelding'] })
  gender: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ type: GeneMap, required: true })
  genes: GeneMap;

  @Prop({ type: TrainingLevels, default: () => ({}) })
  training: TrainingLevels;

  @Prop({ type: Map, of: Number, default: () => ({}) })
  skills: Map<string, number>;

  @Prop({ type: MentalState, required: true })
  mentalState: MentalState;

  @Prop({ required: true, enum: ['pasture', 'stall'], default: 'pasture' })
  housing: string;

  @Prop({ type: Satisfaction, default: () => ({}) })
  satisfaction: Satisfaction;

  @Prop({ type: [Bond], default: [] })
  bonds: Bond[];

  @Prop({ type: Object, required: true })
  visualGenetics: {
    extension: [string, string];
    agouti: [string, string];
    gray: [string, string];
  }

  @Prop({ type: ParentInfo })
  sire?: ParentInfo;

  @Prop({ type: ParentInfo })
  dam?: ParentInfo;

  @Prop({ default: 0 })
  generation: number;

  @Prop({ required: true, default: Date.now })
  birthDate: Date;
}

export const HorseSchema = SchemaFactory.createForClass(Horse);

// Add indexes for common queries
HorseSchema.index({ ownerId: 1 });
HorseSchema.index({ name: 1, ownerId: 1 });

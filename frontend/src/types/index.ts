// Re-export types from shared module
export type { 
  GeneMap, 
  StatName,
  Personality,
  Mood,
  Horse as SharedHorse,
  VisualGenetics
} from '@shared/index';

// Frontend-specific types
export interface Horse {
  id: string;
  name: string;
  age: number;
  gender: 'stallion' | 'mare' | 'gelding';
  genes: {
    [key: string]: [number, number];
  };
  training: {
    [key: string]: number;
  };
  skills: {
    [key: string]: number;
  };
  mentalState: {
    personality: string;
    mood: string;
    previousMood?: string;
    previousSkill?: string;
    fatigue: number;
  };
  housing: 'pasture' | 'stall';
  satisfaction: {
    exercise: { current: number; required: number };
    stimulation: { current: number; required: number };
    nutrition: { current: number; required: number };
    socialization: { current: number; required: number };
  };
  bonds: any[];
  visualGenetics: {
    extension: [string, string];
    agouti: [string, string];
    gray: [string, string];
  }
  sire?: { id: string; name: string };
  dam?: { id: string; name: string };
  generation: number;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrainingResult {
  success: boolean;
  skillGained: number;
  newSkillLevel: number;
  statsGained: {
    [key: string]: number;
  };
  fatigueGained: number;
  moodChanged?: boolean;
  newMood?: string;
  message: string;
  timeRemaining: number;
}

export interface GameState {
  currentDay: number;
  timeRemainingToday: number;
  money: number;
  trainerSkillLevel: number;
  horseCount: number;
  horses: Horse[];
}

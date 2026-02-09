/**
 * Mental State Type Definitions
 * Types for personality, mood, satisfaction, and bonds
 */

/**
 * Horse personality types (fixed at birth)
 */
export type Personality =
  | 'Recalcitrant'
  | 'Intractable'
  | 'Stubborn'
  | 'Aloof'
  | 'Timid'
  | 'Indifferent'
  | 'Curious'
  | 'Personable'
  | 'Willing'
  | 'Amiable'
  | 'Bold';

/**
 * Horse mood types (changes daily)
 */
export type Mood =
  | 'Shut-down'
  | 'Burnt Out'
  | 'Depressed'
  | 'Tired'
  | 'Withdrawn'
  | 'Pent-up'
  | 'Anxious'
  | 'Grumpy'
  | 'Apathetic'
  | 'Calm'
  | 'Cheerful'
  | 'Satisfied'
  | 'Sassy'
  | 'Perky'
  | 'Energetic'
  | 'Confused'
  | 'Intrigued'
  | 'Eager'
  | 'Focused';

/**
 * Housing type affects satisfaction requirements
 */
export type HousingType = 'pasture' | 'stall';

/**
 * Satisfaction requirement and current level
 */
export interface SatisfactionLevel {
  current: number;
  required: number;
}

/**
 * All satisfaction types
 */
export interface Satisfaction {
  exercise: SatisfactionLevel;
  stimulation: SatisfactionLevel;
  nutrition: SatisfactionLevel;
  socialization: SatisfactionLevel;
}

/**
 * Bond between horse and a person (player or NPC)
 */
export interface Bond {
  personId: string;
  level: number; // 0-100
  lastInteraction: Date;
}

/**
 * Complete mental state of a horse
 */
export interface MentalState {
  personality: Personality;
  mood: Mood;
  previousMood?: Mood; // For reverting from Confused
  previousSkill?: string; // For Intrigued/Anxious after Confused
  fatigue: number; // 0-100
}

/**
 * Personality value for training formula (-20 to +20)
 */
export const PERSONALITY_VALUES: Record<Personality, number | 'variable'> = {
  'Recalcitrant': -10,
  'Intractable': -7,
  'Stubborn': -5,
  'Aloof': -3,
  'Timid': -1,
  'Indifferent': 0,
  'Curious': 1,
  'Personable': 2,
  'Willing': 4,
  'Amiable': 5,
  'Bold': 'variable', // -3 to +8, influenced by bond
};

/**
 * Personality tractability (for Confused → Intrigued vs Anxious)
 * Positive = tractable (more likely Intrigued)
 * Negative = stubborn (more likely Anxious)
 */
export const PERSONALITY_TRACTABILITY: Record<Personality, number> = {
  'Recalcitrant': -10,
  'Intractable': -8,
  'Stubborn': -6,
  'Aloof': -3,
  'Timid': -2,
  'Indifferent': 0,
  'Curious': 3,
  'Personable': 5,
  'Willing': 7,
  'Amiable': 8,
  'Bold': 2,
};

/**
 * Mood modifiers for training formula (0-1.4)
 */
export const MOOD_MODIFIERS: Record<Mood, number> = {
  // Cannot train effectively
  'Shut-down': 0,
  
  // Severely impaired
  'Burnt Out': 0.3,
  'Depressed': 0.2,
  
  // Below average
  'Tired': 0.6,
  'Withdrawn': 0.5,
  'Anxious': 0.5,
  'Grumpy': 0.7,
  
  // Average
  'Apathetic': 1.0,
  'Calm': 1.0,
  'Satisfied': 1.0,
  
  // Above average
  'Cheerful': 1.1,
  'Perky': 1.15,
  'Eager': 1.2,
  'Focused': 1.4,
  
  // Special cases (actual value calculated dynamically)
  'Pent-up': 1.0, // Modified by skill type
  'Energetic': 1.25,
  'Sassy': 1.0, // Highly variable 0.9-1.5
  'Confused': 1.0,
  'Intrigued': 1.3,
};

/**
 * Get personality value for training formula
 * For Bold, pass in the bond level (0-100)
 */
export function getPersonalityValue(personality: Personality, bondLevel: number = 0): number {
  const value = PERSONALITY_VALUES[personality];
  
  if (value === 'variable') {
    // Bold personality: -3 to +8, influenced by bond
    const baseBold = Math.random() * 11 - 3; // -3 to +8
    const bondInfluence = bondLevel / 100; // 0-1
    return baseBold + (bondInfluence * 5); // Shifts toward positive with higher bond
  }
  
  return value;
}

/**
 * Satisfaction requirement modifiers based on personality
 */
export interface PersonalityRequirementModifiers {
  exercise: number;
  stimulation: number;
  socialization: number;
}

export const PERSONALITY_REQUIREMENT_MODIFIERS: Record<Personality, PersonalityRequirementModifiers> = {
  'Recalcitrant': { exercise: 0.8, stimulation: 0.8, socialization: 0.7 },
  'Intractable': { exercise: 0.8, stimulation: 0.8, socialization: 0.7 },
  'Stubborn': { exercise: 0.9, stimulation: 0.9, socialization: 0.8 },
  'Aloof': { exercise: 1.0, stimulation: 1.0, socialization: 0.6 },
  'Timid': { exercise: 0.9, stimulation: 1.1, socialization: 1.2 },
  'Indifferent': { exercise: 1.0, stimulation: 1.0, socialization: 1.0 },
  'Curious': { exercise: 1.1, stimulation: 1.3, socialization: 1.1 },
  'Personable': { exercise: 1.0, stimulation: 1.1, socialization: 1.4 },
  'Willing': { exercise: 1.2, stimulation: 1.1, socialization: 1.2 },
  'Amiable': { exercise: 1.1, stimulation: 1.0, socialization: 1.3 },
  'Bold': { exercise: 1.3, stimulation: 1.2, socialization: 0.9 },
};

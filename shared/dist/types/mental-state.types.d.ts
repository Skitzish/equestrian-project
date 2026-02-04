/**
 * Mental State Type Definitions
 * Types for personality, mood, satisfaction, and bonds
 */
/**
 * Horse personality types (fixed at birth)
 */
export type Personality = 'Recalcitrant' | 'Intractable' | 'Stubborn' | 'Aloof' | 'Timid' | 'Indifferent' | 'Curious' | 'Personable' | 'Willing' | 'Amiable' | 'Bold';
/**
 * Horse mood types (changes daily)
 */
export type Mood = 'Shut-down' | 'Burnt Out' | 'Depressed' | 'Tired' | 'Withdrawn' | 'Pent-up' | 'Anxious' | 'Grumpy' | 'Apathetic' | 'Calm' | 'Cheerful' | 'Satisfied' | 'Sassy' | 'Perky' | 'Energetic' | 'Confused' | 'Intrigued' | 'Eager' | 'Focused';
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
    level: number;
    lastInteraction: Date;
}
/**
 * Complete mental state of a horse
 */
export interface MentalState {
    personality: Personality;
    mood: Mood;
    previousMood?: Mood;
    previousSkill?: string;
    fatigue: number;
}
/**
 * Personality value for training formula (-20 to +20)
 */
export declare const PERSONALITY_VALUES: Record<Personality, number | 'variable'>;
/**
 * Personality tractability (for Confused → Intrigued vs Anxious)
 * Positive = tractable (more likely Intrigued)
 * Negative = stubborn (more likely Anxious)
 */
export declare const PERSONALITY_TRACTABILITY: Record<Personality, number>;
/**
 * Mood modifiers for training formula (0-1.4)
 */
export declare const MOOD_MODIFIERS: Record<Mood, number>;
/**
 * Get personality value for training formula
 * For Bold, pass in the bond level (0-100)
 */
export declare function getPersonalityValue(personality: Personality, bondLevel?: number): number;
/**
 * Satisfaction requirement modifiers based on personality
 */
export interface PersonalityRequirementModifiers {
    exercise: number;
    stimulation: number;
    socialization: number;
}
export declare const PERSONALITY_REQUIREMENT_MODIFIERS: Record<Personality, PersonalityRequirementModifiers>;

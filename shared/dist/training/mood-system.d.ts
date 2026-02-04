/**
 * Mood System
 * Calculate and update horse mood based on satisfaction and training
 */
import { Horse } from '../types/horse.types';
import { Mood } from '../types/mental-state.types';
/**
 * Calculate horse's mood at the start of a new day
 */
export declare function calculateDailyMood(horse: Horse): Mood;
/**
 * Check for mood transition after training session
 */
export declare function checkMoodTransition(horse: Horse, skillId: string, isPhysical: boolean): Mood | null;
/**
 * Check for confusion (random chance after training)
 */
export declare function checkForConfusion(currentMood: Mood, skillLevel: number): boolean;
/**
 * Update fatigue based on training
 */
export declare function updateFatigue(currentFatigue: number, duration: number, isPhysical: boolean): number;
/**
 * Get fatigue modifier for training formula (FM)
 */
export declare function getFatigueModifier(fatigue: number): number;
/**
 * Reduce fatigue (daily recovery)
 */
export declare function reduceFatigue(currentFatigue: number, amount?: number): number;
/**
 * Check if horse is overworked
 */
export declare function isOverworked(horse: Horse): boolean;
/**
 * Determine if horse needs a rest day
 */
export declare function needsRestDay(horse: Horse): boolean;
/**
 * Get mood description for UI
 */
export declare function getMoodDescription(mood: Mood): string;

/**
 * Mood System
 * Calculate and update horse mood based on satisfaction and training
 */

import { Horse } from '../types/horse.types';
import { Mood, PERSONALITY_TRACTABILITY } from '../types/mental-state.types';
import { areSatisfactionNeedsMet, getUnmetNeeds } from './satisfaction-system';

/**
 * Calculate horse's mood at the start of a new day
 */
export function calculateDailyMood(horse: Horse): Mood {
  const needsMet = areSatisfactionNeedsMet(horse.satisfaction);
  const unmetNeeds = getUnmetNeeds(horse.satisfaction);
  
  // Check for severe neglect
  if (unmetNeeds.includes('nutrition') && horse.satisfaction.nutrition.current < 40) {
    return 'Depressed';
  }
  
  // Check for specific unmet needs
  if (!needsMet) {
    // Multiple unmet needs → Withdrawn
    if (unmetNeeds.length >= 2) {
      return 'Withdrawn';
    }
    
    // Single unmet need
    if (unmetNeeds.includes('exercise')) {
      return 'Pent-up';
    }
    if (unmetNeeds.includes('nutrition')) {
      return 'Withdrawn';
    }
  }
  
  // Needs are met - determine positive mood
  // Small chance of grumpy (off day)
  if (Math.random() < 0.05) {
    return 'Grumpy';
  }
  
  // Variable positive moods
  const rand = Math.random();
  
  if (rand < 0.15) return 'Eager';
  if (rand < 0.30) return 'Perky';
  if (rand < 0.45) return 'Cheerful';
  if (rand < 0.60) return 'Energetic';
  if (rand < 0.75) return 'Satisfied';
  if (rand < 0.85) return 'Sassy';
  return 'Calm';
}

/**
 * Check for mood transition after training session
 */
export function checkMoodTransition(
  horse: Horse,
  skillId: string,
  isPhysical: boolean
): Mood | null {
  const currentMood = horse.mentalState.mood;
  
  // Energetic → Focused (if physical workout)
  if (currentMood === 'Energetic' && isPhysical) {
    return 'Focused';
  }
  
  // Anxious → Focused (if grooming)
  if (currentMood === 'Anxious' && skillId === 'grooming') {
    return 'Focused';
  }
  
  // Confused → Intrigued or Anxious (if training same skill)
  if (currentMood === 'Confused') {
    if (skillId === horse.mentalState.previousSkill) {
      const isTracktable = PERSONALITY_TRACTABILITY[horse.mentalState.personality] > 0;
      return isTracktable ? 'Intrigued' : 'Anxious';
    } else {
      // Different skill: revert to previous mood
      return horse.mentalState.previousMood || 'Calm';
    }
  }
  
  return null; // No transition
}

/**
 * Check for confusion (random chance after training)
 */
export function checkForConfusion(
  currentMood: Mood,
  skillLevel: number
): boolean {
  // Higher chance at low skill levels, lower chance at high skill levels
  const confusionChance = Math.max(0.001, (100 - skillLevel) / 10000); // 0.01% at 90, 1% at 0
  return Math.random() < confusionChance;
}

/**
 * Update fatigue based on training
 */
export function updateFatigue(
  currentFatigue: number,
  duration: number,
  isPhysical: boolean
): number {
  // Physical training is more tiring
  const fatigueRate = isPhysical ? 0.5 : 0.2; // Per minute
  const fatigueGained = duration * fatigueRate;
  
  return Math.min(100, currentFatigue + fatigueGained);
}

/**
 * Get fatigue modifier for training formula (FM)
 */
export function getFatigueModifier(fatigue: number): number {
  // 0 fatigue = 1.0 modifier
  // 100 fatigue = 0.0 modifier
  return Math.max(0, 1.0 - (fatigue / 100));
}

/**
 * Reduce fatigue (daily recovery)
 */
export function reduceFatigue(currentFatigue: number, amount: number = 20): number {
  return Math.max(0, currentFatigue - amount);
}

/**
 * Check if horse is overworked
 */
export function isOverworked(horse: Horse): boolean {
  return horse.mentalState.fatigue >= 80;
}

/**
 * Determine if horse needs a rest day
 */
export function needsRestDay(horse: Horse): boolean {
  return (
    horse.mentalState.fatigue >= 60 ||
    horse.mentalState.mood === 'Tired' ||
    horse.mentalState.mood === 'Burnt Out'
  );
}

/**
 * Get mood description for UI
 */
export function getMoodDescription(mood: Mood): string {
  const descriptions: Record<Mood, string> = {
    'Shut-down': 'This horse has been pushed too hard and will not make progress.',
    'Burnt Out': 'This horse has been pushed to its limit. Give it a break.',
    'Depressed': 'This horse is severely neglected. Check its nutrition and care.',
    'Tired': 'This horse needs rest or lighter training.',
    'Withdrawn': 'This horse is being neglected. Check its care requirements.',
    'Pent-up': 'This horse needs more exercise. Physical training recommended.',
    'Anxious': 'This horse is stressed. Consider desensitization work or rest.',
    'Grumpy': 'This horse is having an off day. Progress will be slower.',
    'Apathetic': 'This horse is content but not engaged in training.',
    'Calm': 'This horse is ready to work.',
    'Cheerful': 'This horse is happy and ready to learn.',
    'Satisfied': 'This horse is content with its routine.',
    'Sassy': 'This horse is feeling spirited! Progress will vary.',
    'Perky': 'This horse is eager and will learn quickly.',
    'Energetic': 'This horse is ready for a good workout.',
    'Confused': 'This horse is uncertain. Repeat training or switch tasks.',
    'Intrigued': 'This horse is fascinated! Excellent learning opportunity.',
    'Eager': 'This horse is highly motivated to work.',
    'Focused': 'This horse is in the zone! Exceptional learning.',
  };
  
  return descriptions[mood] || 'Unknown mood.';
}

/**
 * Satisfaction System
 * Calculate and manage horse satisfaction levels
 */

import { Horse } from '../types/horse.types';
import { Satisfaction, PERSONALITY_REQUIREMENT_MODIFIERS } from '../types/mental-state.types';

/**
 * Calculate satisfaction requirements based on housing, age, and personality
 */
export function calculateSatisfactionRequirements(horse: Horse): Satisfaction {
  // Pasture horses get most needs met naturally
  if (horse.housing === 'pasture') {
    return {
      exercise: { current: horse.satisfaction.exercise.current, required: 0 },
      stimulation: { current: horse.satisfaction.stimulation.current, required: 0 },
      socialization: { current: horse.satisfaction.socialization.current, required: 0 },
      nutrition: { current: horse.satisfaction.nutrition.current, required: 80 },
    };
  }
  
  // Stall-kept horses have requirements
  const baseRequirements = {
    exercise: 30,
    stimulation: 25,
    socialization: 20,
    nutrition: 80,
  };
  
  // Age modifier (younger horses need more exercise)
  const ageMultiplier = horse.age < 5 ? 1.5 : horse.age > 15 ? 0.7 : 1.0;
  
  // Personality modifiers
  const personalityMods = PERSONALITY_REQUIREMENT_MODIFIERS[horse.mentalState.personality];
  
  return {
    exercise: {
      current: horse.satisfaction.exercise.current,
      required: Math.round(baseRequirements.exercise * ageMultiplier * personalityMods.exercise),
    },
    stimulation: {
      current: horse.satisfaction.stimulation.current,
      required: Math.round(baseRequirements.stimulation * personalityMods.stimulation),
    },
    socialization: {
      current: horse.satisfaction.socialization.current,
      required: Math.round(baseRequirements.socialization * personalityMods.socialization),
    },
    nutrition: {
      current: horse.satisfaction.nutrition.current,
      required: baseRequirements.nutrition,
    },
  };
}

/**
 * Check if all satisfaction needs are met
 */
export function areSatisfactionNeedsMet(satisfaction: Satisfaction): boolean {
  return (
    satisfaction.exercise.current >= satisfaction.exercise.required &&
    satisfaction.stimulation.current >= satisfaction.stimulation.required &&
    satisfaction.socialization.current >= satisfaction.socialization.required &&
    satisfaction.nutrition.current >= satisfaction.nutrition.required
  );
}

/**
 * Get unmet satisfaction needs
 */
export function getUnmetNeeds(satisfaction: Satisfaction): string[] {
  const unmet: string[] = [];
  
  if (satisfaction.exercise.current < satisfaction.exercise.required) {
    unmet.push('exercise');
  }
  if (satisfaction.stimulation.current < satisfaction.stimulation.required) {
    unmet.push('stimulation');
  }
  if (satisfaction.socialization.current < satisfaction.socialization.required) {
    unmet.push('socialization');
  }
  if (satisfaction.nutrition.current < satisfaction.nutrition.required) {
    unmet.push('nutrition');
  }
  
  return unmet;
}

/**
 * Add satisfaction from an activity
 */
export function addSatisfaction(
  satisfaction: Satisfaction,
  type: 'exercise' | 'stimulation' | 'socialization' | 'nutrition',
  amount: number
): Satisfaction {
  const updated = { ...satisfaction };
  updated[type] = {
    ...updated[type],
    current: Math.min(100, updated[type].current + amount),
  };
  return updated;
}

/**
 * Reset daily satisfaction (at start of new day)
 */
export function resetDailySatisfaction(satisfaction: Satisfaction): Satisfaction {
  return {
    exercise: { current: 0, required: satisfaction.exercise.required },
    stimulation: { current: 0, required: satisfaction.stimulation.required },
    socialization: { current: 0, required: satisfaction.socialization.required },
    nutrition: { current: satisfaction.nutrition.current, required: satisfaction.nutrition.required },
  };
}

/**
 * Calculate satisfaction from training session
 * Returns how much of each type was gained
 */
export function calculateTrainingSatisfaction(
  skillId: string,
  duration: number,
  isPhysical: boolean
): { exercise: number; stimulation: number; socialization: number } {
  // Base values per minute
  const exercisePerMin = isPhysical ? 2 : 0.5;
  const stimulationPerMin = 1.5;
  const socializationPerMin = 0.5; // Working with trainer
  
  return {
    exercise: Math.round(exercisePerMin * duration),
    stimulation: Math.round(stimulationPerMin * duration),
    socialization: Math.round(socializationPerMin * duration),
  };
}

/**
 * Satisfaction System
 * Calculate and manage horse satisfaction levels
 */
import { Horse } from '../types/horse.types';
import { Satisfaction } from '../types/mental-state.types';
/**
 * Calculate satisfaction requirements based on housing, age, and personality
 */
export declare function calculateSatisfactionRequirements(horse: Horse): Satisfaction;
/**
 * Check if all satisfaction needs are met
 */
export declare function areSatisfactionNeedsMet(satisfaction: Satisfaction): boolean;
/**
 * Get unmet satisfaction needs
 */
export declare function getUnmetNeeds(satisfaction: Satisfaction): string[];
/**
 * Add satisfaction from an activity
 */
export declare function addSatisfaction(satisfaction: Satisfaction, type: 'exercise' | 'stimulation' | 'socialization' | 'nutrition', amount: number): Satisfaction;
/**
 * Reset daily satisfaction (at start of new day)
 */
export declare function resetDailySatisfaction(satisfaction: Satisfaction): Satisfaction;
/**
 * Calculate satisfaction from training session
 * Returns how much of each type was gained
 */
export declare function calculateTrainingSatisfaction(skillId: string, duration: number, isPhysical: boolean): {
    exercise: number;
    stimulation: number;
    socialization: number;
};

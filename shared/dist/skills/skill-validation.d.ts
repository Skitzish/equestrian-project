/**
 * Skill Validation
 * Check if a horse can train a specific skill
 */
import { Horse } from '../types/horse.types';
import { SkillDefinition, TrainingValidation } from '../types/training.types';
/**
 * Validate if a horse can train a skill
 */
export declare function validateSkillTraining(horse: Horse, skillId: string): TrainingValidation;
/**
 * Get all skills a horse can currently train
 */
export declare function getTrainableSkills(horse: Horse): SkillDefinition[];
/**
 * Get next skills a horse could unlock (missing 1-2 prerequisites)
 */
export declare function getNextSkills(horse: Horse): SkillDefinition[];
/**
 * Calculate skill progression percentage (0-100)
 * Shows how much of the skill tree the horse has completed
 */
export declare function calculateSkillProgress(horse: Horse): number;
/**
 * Get skill mastery level description
 */
export declare function getSkillMasteryLevel(level: number): string;

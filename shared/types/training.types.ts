/**
 * Training Type Definitions
 * Types for skills, training sessions, and results
 */

import { StatName } from './genetics.types';

/**
 * Skill prerequisite requirement
 */
export interface SkillPrerequisite {
  skill?: string;     //Optional
  minLevel?: number;  //Optional
  anyOf?: Array<{     //New, optional OR group
    skill: string;
    minLevel: number;
  }>;
}

/**
 * Minimum stat requirement for advanced skills
 */
export interface StatRequirement {
  stat: StatName;
  minLevel: number; // 0.0 - 1.0 (percentage of potential trained)
}

/**
 * Stat contribution from training a skill
 */
export interface StatContribution {
  stat: StatName;
  amount: number; // How much this stat improves per successful session
}

/**
 * Stat influence on learning a skill
 */
export interface StatInfluence {
  stat: StatName;
  weight: number; // 0.0 - 1.0, how much this stat helps learn the skill
}

/**
 * Skill category
 */
export type SkillCategory = 
  | 'foundation'    // Haltering, leading, grooming
  | 'ground'        // Lunging, ground driving
  | 'basicRiding'   // Basic ridden work necessary for all disciplines
  | 'intermediate'  // Skills just a little more difficult, but good for all disciplines
  | 'advanced'      // Difficult skills that are useful for all disciplines
  | 'discipline'    // Difficult skills that are specific to certain disciplines
  | 'care'          // Grooming, standing for vet
  | 'driving';      // Skills where the horse is driven from behind rather than ridden

/**
 * Complete skill definition
 */
export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  baseTrainingValue: number; // BTV in formula (1-10, higher = easier)
  prerequisites: SkillPrerequisite[];
  minimumStats: StatRequirement[];
  statInfluences: StatInfluence[];
  statContributions: StatContribution[];
  isPhysical: boolean; // Affects Pent-up/Energetic mood modifiers
}

/**
 * Horse's current skill levels
 */
export type SkillLevels = Record<string, number>; // skill ID -> level (0-100)

/**
 * Training session duration in minutes
 */
export type SessionDuration = 5 | 15 | 30 | 60;

/**
 * Training session input
 */
export interface TrainingSession {
  skillId: string;
  duration: SessionDuration;
  trainerId: string;
}

/**
 * Training session result
 */
export interface TrainingResult {
  success: boolean;
  skillGained: number; // Points gained (or lost if negative)
  statsGained: Partial<Record<StatName, number>>; // Stat training level improvements
  fatigueGained: number;
  moodChanged?: boolean;
  newMood?: string;
  message: string; // Flavor text based on personality and result
}

/**
 * Trainer NPC or player
 */
export interface Trainer {
  id: string;
  name: string;
  skillLevel: number; // 0-100, affects TSM in formula
}

/**
 * Calculate trainer skill modifier (TSM) for formula
 */
export function getTrainerSkillModifier(trainer: Trainer): number {
  // 0 skill = 0.75, 100 skill = 1.25
  return 0.75 + (trainer.skillLevel / 100) * 0.5;
}

/**
 * Training validation result
 */
export interface TrainingValidation {
  canTrain: boolean;
  reason?: string;
  missingPrerequisites?: SkillPrerequisite[];
  missingStats?: StatRequirement[];
}

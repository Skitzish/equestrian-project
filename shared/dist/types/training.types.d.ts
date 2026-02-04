/**
 * Training Type Definitions
 * Types for skills, training sessions, and results
 */
import { StatName } from './genetics.types';
/**
 * Skill prerequisite requirement
 */
export interface SkillPrerequisite {
    skill?: string;
    minLevel?: number;
    anyOf?: Array<{
        skill: string;
        minLevel: number;
    }>;
}
/**
 * Minimum stat requirement for advanced skills
 */
export interface StatRequirement {
    stat: StatName;
    minLevel: number;
}
/**
 * Stat contribution from training a skill
 */
export interface StatContribution {
    stat: StatName;
    amount: number;
}
/**
 * Stat influence on learning a skill
 */
export interface StatInfluence {
    stat: StatName;
    weight: number;
}
/**
 * Skill category
 */
export type SkillCategory = 'foundation' | 'ground' | 'basicRiding' | 'intermediate' | 'advanced' | 'discipline' | 'care' | 'driving';
/**
 * Complete skill definition
 */
export interface SkillDefinition {
    id: string;
    name: string;
    category: SkillCategory;
    description: string;
    baseTrainingValue: number;
    prerequisites: SkillPrerequisite[];
    minimumStats: StatRequirement[];
    statInfluences: StatInfluence[];
    statContributions: StatContribution[];
    isPhysical: boolean;
}
/**
 * Horse's current skill levels
 */
export type SkillLevels = Record<string, number>;
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
    skillGained: number;
    statsGained: Partial<Record<StatName, number>>;
    fatigueGained: number;
    moodChanged?: boolean;
    newMood?: string;
    message: string;
}
/**
 * Trainer NPC or player
 */
export interface Trainer {
    id: string;
    name: string;
    skillLevel: number;
}
/**
 * Calculate trainer skill modifier (TSM) for formula
 */
export declare function getTrainerSkillModifier(trainer: Trainer): number;
/**
 * Training validation result
 */
export interface TrainingValidation {
    canTrain: boolean;
    reason?: string;
    missingPrerequisites?: SkillPrerequisite[];
    missingStats?: StatRequirement[];
}

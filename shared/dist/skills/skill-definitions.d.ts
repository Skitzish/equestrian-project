/**
 * Skill Definitions
 * All trainable skills with their properties
 */
import { SkillDefinition } from '../types/training.types';
/**
 * All skill definitions
 * This is the MVP set - expand as needed
 */
export declare const SKILLS: Record<string, SkillDefinition>;
/**
 * Get all skill IDs
 */
export declare function getAllSkillIds(): string[];
/**
 * Get skill definition by ID
 */
export declare function getSkill(skillId: string): SkillDefinition | undefined;
/**
 * Get skills by category
 */
export declare function getSkillsByCategory(category: string): SkillDefinition[];
/**
 * Get foundation skills (no prerequisites)
 */
export declare function getFoundationSkills(): SkillDefinition[];

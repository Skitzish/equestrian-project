/**
 * Horse Type Definition
 * Complete type for a horse including genetics, stats, skills, and mental state
 */
import { GeneMap, StatName } from './genetics.types';
import { MentalState, Satisfaction, Bond, HousingType } from './mental-state.types';
import { SkillLevels } from './training.types';
import { VisualGenetics } from './visual-genetics.types';
/**
 * Horse gender
 */
export type Gender = 'stallion' | 'mare' | 'gelding';
/**
 * Training level for a single stat (0.0 - 1.0)
 * Represents how much of genetic potential has been unlocked through training
 */
export type TrainingLevel = number;
/**
 * Training levels for all stats
 */
export type TrainingLevels = Record<StatName, TrainingLevel>;
/**
 * Calculated effective stat value
 * = genetic potential × training level
 */
export interface EffectiveStat {
    potential: number;
    trained: TrainingLevel;
    effective: number;
    stars: number;
}
/**
 * All effective stats for a horse
 */
export type EffectiveStats = Record<StatName, EffectiveStat>;
/**
 * Parent reference for lineage tracking
 */
export interface ParentInfo {
    id: string;
    name: string;
}
/**
 * Complete horse data
 */
export interface Horse {
    id: string;
    name: string;
    age: number;
    gender: Gender;
    ownerId: string;
    genes: GeneMap;
    training: TrainingLevels;
    skills: SkillLevels;
    mentalState: MentalState;
    housing: HousingType;
    satisfaction: Satisfaction;
    bonds: Bond[];
    visualGenetics: VisualGenetics;
    sire?: ParentInfo;
    dam?: ParentInfo;
    generation: number;
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Calculate effective stats from genes and training
 */
export declare function calculateEffectiveStats(genes: GeneMap, training: TrainingLevels): EffectiveStats;
/**
 * Initialize default training levels (all 0)
 */
export declare function initializeTrainingLevels(): TrainingLevels;
/**
 * Initialize default skill levels (all 0)
 */
export declare function initializeSkillLevels(): SkillLevels;
/**
 * Create a new foal
 */
export declare function createFoal(name: string, gender: Gender, genes: GeneMap, visualGenetics: VisualGenetics, sire: ParentInfo, dam: ParentInfo, ownerId: string, personality: MentalState['personality'], sireGeneration?: number, damGeneration?: number): Omit<Horse, 'id' | 'createdAt' | 'updatedAt'>;

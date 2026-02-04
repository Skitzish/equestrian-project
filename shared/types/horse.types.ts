/**
 * Horse Type Definition
 * Complete type for a horse including genetics, stats, skills, and mental state
 */

import { GeneMap, StatName, calculatePotential } from './genetics.types';
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
  potential: number; // Average of two alleles (0-100)
  trained: TrainingLevel; // Percentage unlocked (0.0-1.0)
  effective: number; // potential × trained
  stars: number; // 1-5 star rating of potential
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
  // Identity
  id: string;
  name: string;
  age: number; // In years
  gender: Gender;
  ownerId: string;
  
  // Genetics (immutable after birth)
  genes: GeneMap;
  
  // Stats (derived from genes + training)
  training: TrainingLevels;
  
  // Skills (learned behaviors)
  skills: SkillLevels;
  
  // Mental state
  mentalState: MentalState;
  
  // Care and housing
  housing: HousingType;
  satisfaction: Satisfaction;
  
  // Relationships
  bonds: Bond[];
  
  // Visual Genetics
  visualGenetics: VisualGenetics;

  // Lineage
  sire?: ParentInfo;
  dam?: ParentInfo;
  generation: number; // 0 = foundation horse, 1 = bred from foundation, etc.
  
  // Timestamps
  birthDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Calculate effective stats from genes and training
 */
export function calculateEffectiveStats(genes: GeneMap, training: TrainingLevels): EffectiveStats {
  const stats: Partial<EffectiveStats> = {};
  
  for (const stat in genes) {
    const statName = stat as StatName;
    const potential = calculatePotential(genes[statName]);
    const trained = training[statName] || 0;
    const effective = potential * trained;
    
    stats[statName] = {
      potential,
      trained,
      effective,
      stars: getStarRating(potential)
    };
  }
  
  return stats as EffectiveStats;
}

/**
 * Get star rating for potential
 */
function getStarRating(potential: number): number {
  if (potential >= 90) return 5;
  if (potential >= 75) return 4;
  if (potential >= 60) return 3;
  if (potential >= 45) return 2;
  return 1;
}

/**
 * Initialize default training levels (all 0)
 */
export function initializeTrainingLevels(): TrainingLevels {
  return {
    strength: 0,
    speed: 0,
    agility: 0,
    balance: 0,
    stamina: 0,
    movement: 0,
    tempo: 0,
    bravery: 0,
    competitiveness: 0,
    flexibility: 0,
    intelligence: 0,
    loyalty: 0,
    sociability: 0,
    stolidity: 0,
  };
}

/**
 * Initialize default skill levels (all 0)
 */
export function initializeSkillLevels(): SkillLevels {
  return {};
}

/**
 * Create a new foal
 */
export function createFoal(
  name: string,
  gender: Gender,
  genes: GeneMap,
  visualGenetics: VisualGenetics,
  sire: ParentInfo,
  dam: ParentInfo,
  ownerId: string,
  personality: MentalState['personality'],
  sireGeneration: number = 0,
  damGeneration: number = 0
): Omit<Horse, 'id' | 'createdAt' | 'updatedAt'> {
  const now = new Date();
  
  return {
    name,
    age: 0,
    gender,
    ownerId,
    genes,
    training: initializeTrainingLevels(),
    skills: initializeSkillLevels(),
    mentalState: {
      personality,
      mood: 'Apathetic',
      fatigue: 0,
    },
    housing: 'pasture',
    satisfaction: {
      exercise: { current: 0, required: 0 },
      stimulation: { current: 0, required: 0 },
      nutrition: { current: 100, required: 80 },
      socialization: { current: 0, required: 0 },
    },
    bonds: [],
    visualGenetics,
    sire,
    dam,
    generation: Math.max(sireGeneration, damGeneration) + 1,
    birthDate: now,
  };
}

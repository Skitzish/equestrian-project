/**
 * Phenotype Calculation
 * Calculate effective stats from genes and training
 */
import { GeneMap, StatName } from '../types/genetics.types';
import { TrainingLevels, EffectiveStats } from '../types/horse.types';
/**
 * Calculate all effective stats for a horse
 */
export declare function calculatePhenotype(genes: GeneMap, training: TrainingLevels, age?: number): EffectiveStats;
/**
 * Calculate a horse's overall quality score (0-100)
 * Based on average potential across all stats
 */
export declare function calculateOverallQuality(genes: GeneMap): number;
/**
 * Calculate a horse's training progress (0-100)
 * Based on average training level across all stats
 */
export declare function calculateOverallTraining(training: TrainingLevels): number;
/**
 * Get the highest potential stat
 */
export declare function getStrongestStat(genes: GeneMap): {
    stat: StatName;
    potential: number;
};
/**
 * Get the weakest potential stat
 */
export declare function getWeakestStat(genes: GeneMap): {
    stat: StatName;
    potential: number;
};

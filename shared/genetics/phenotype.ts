/**
 * Phenotype Calculation
 * Calculate effective stats from genes and training
 */

import { GeneMap, StatName, calculatePotential } from '../types/genetics.types';
import { TrainingLevels, EffectiveStats } from '../types/horse.types';

/**
 * Calculate all effective stats for a horse
 */
export function calculatePhenotype(
  genes: GeneMap,
  training: TrainingLevels,
  age?: number
): EffectiveStats {
  const stats: Partial<EffectiveStats> = {};
  
  for (const stat in genes) {
    const statName = stat as StatName;
    const potential = calculatePotential(genes[statName]);
    const trained = training[statName] || 0;
    
    // Age can affect effective stats (optional)
    const ageModifier = age ? getAgeModifier(age) : 1.0;
    
    const effective = potential * trained * ageModifier;
    
    stats[statName] = {
      potential,
      trained,
      effective,
      stars: getStarRating(potential),
    };
  }
  
  return stats as EffectiveStats;
}

/**
 * Age modifier for stats
 * Young horses: still developing
 * Prime horses: full capability
 * Older horses: declining
 */
function getAgeModifier(age: number): number {
  if (age < 2) return 0.5;  // Too young to train
  if (age < 5) return 0.7 + (age - 2) * 0.1; // 70% at 2, 100% at 5
  if (age <= 12) return 1.0; // Prime years
  if (age <= 20) return 1.0 - ((age - 12) * 0.05); // Gradual decline
  return 0.6; // Senior horses
}

/**
 * Star rating based on potential
 */
function getStarRating(potential: number): number {
  if (potential >= 90) return 5;
  if (potential >= 75) return 4;
  if (potential >= 60) return 3;
  if (potential >= 45) return 2;
  return 1;
}

/**
 * Calculate a horse's overall quality score (0-100)
 * Based on average potential across all stats
 */
export function calculateOverallQuality(genes: GeneMap): number {
  let totalPotential = 0;
  let count = 0;
  
  for (const stat in genes) {
    const statName = stat as StatName;
    totalPotential += calculatePotential(genes[statName]);
    count++;
  }
  
  return totalPotential / count;
}

/**
 * Calculate a horse's training progress (0-100)
 * Based on average training level across all stats
 */
export function calculateOverallTraining(training: TrainingLevels): number {
  let totalTraining = 0;
  let count = 0;
  
  for (const stat in training) {
    totalTraining += training[stat as StatName];
    count++;
  }
  
  return (totalTraining / count) * 100;
}

/**
 * Get the highest potential stat
 */
export function getStrongestStat(genes: GeneMap): { stat: StatName; potential: number } {
  let strongest: StatName = 'strength';
  let highestPotential = 0;
  
  for (const stat in genes) {
    const statName = stat as StatName;
    const potential = calculatePotential(genes[statName]);
    
    if (potential > highestPotential) {
      highestPotential = potential;
      strongest = statName;
    }
  }
  
  return { stat: strongest, potential: highestPotential };
}

/**
 * Get the weakest potential stat
 */
export function getWeakestStat(genes: GeneMap): { stat: StatName; potential: number } {
  let weakest: StatName = 'strength';
  let lowestPotential = 100;
  
  for (const stat in genes) {
    const statName = stat as StatName;
    const potential = calculatePotential(genes[statName]);
    
    if (potential < lowestPotential) {
      lowestPotential = potential;
      weakest = statName;
    }
  }
  
  return { stat: weakest, potential: lowestPotential };
}

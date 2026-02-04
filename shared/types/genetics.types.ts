/**
 * Genetics Type Definitions
 * Core types for the genetic system
 */

/**
 * Allele value: 0-100 representing genetic potential
 */
export type Allele = number;

/**
 * Gene pair for a single stat
 */
export type GenePair = [Allele, Allele];

/**
 * Complete genetic map for a horse
 * Each stat has two alleles (one from each parent)
 */
export interface GeneMap {
  // Physical stats
  strength: GenePair;
  speed: GenePair;
  agility: GenePair;
  balance: GenePair;
  stamina: GenePair;
  movement: GenePair;
  tempo: GenePair;
  
  // Mental stats
  bravery: GenePair;
  competitiveness: GenePair;
  flexibility: GenePair;
  intelligence: GenePair;
  loyalty: GenePair;
  sociability: GenePair;
  stolidity: GenePair;
}

/**
 * Stat names for type safety
 */
export type StatName = keyof GeneMap;

/**
 * Physical stats only
 */
export type PhysicalStat = 'strength' | 'speed' | 'agility' | 'balance' | 'stamina' | 'movement' | 'tempo';

/**
 * Mental stats only
 */
export type MentalStat = 'bravery' | 'competitiveness' | 'flexibility' | 'intelligence' | 'loyalty' | 'sociability' | 'stolidity';

/**
 * Calculate the potential (average of two alleles)
 */
export function calculatePotential(genePair: GenePair): number {
  return (genePair[0] + genePair[1]) / 2;
}

/**
 * Star rating based on potential (1-5 stars)
 */
export function getStarRating(potential: number): number {
  if (potential >= 90) return 5; // Elite
  if (potential >= 75) return 4; // Excellent
  if (potential >= 60) return 3; // Good
  if (potential >= 45) return 2; // Average
  return 1; // Poor
}

/**
 * Validate that an allele is within valid range
 */
export function isValidAllele(value: number): boolean {
  return value >= 0 && value <= 100;
}

/**
 * Validate an entire gene map
 */
export function validateGeneMap(genes: Partial<GeneMap>): genes is GeneMap {
  const requiredStats: StatName[] = [
    'strength', 'speed', 'agility', 'balance', 'stamina', 'movement', 'tempo',
    'bravery', 'competitiveness', 'flexibility', 'intelligence', 'loyalty', 'sociability', 'stolidity'
  ];
  
  for (const stat of requiredStats) {
    if (!genes[stat]) return false;
    const [allele1, allele2] = genes[stat]!;
    if (!isValidAllele(allele1) || !isValidAllele(allele2)) return false;
  }
  
  return true;
}

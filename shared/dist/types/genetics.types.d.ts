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
    strength: GenePair;
    speed: GenePair;
    agility: GenePair;
    balance: GenePair;
    stamina: GenePair;
    movement: GenePair;
    tempo: GenePair;
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
export declare function calculatePotential(genePair: GenePair): number;
/**
 * Star rating based on potential (1-5 stars)
 */
export declare function getStarRating(potential: number): number;
/**
 * Validate that an allele is within valid range
 */
export declare function isValidAllele(value: number): boolean;
/**
 * Validate an entire gene map
 */
export declare function validateGeneMap(genes: Partial<GeneMap>): genes is GeneMap;

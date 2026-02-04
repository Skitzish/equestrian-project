/**
 * Breeding Genetics
 * Logic for creating offspring from two parents
 */
import { GeneMap } from '../types/genetics.types';
import { Personality } from '../types/mental-state.types';
/**
 * Breeding configuration options
 */
export interface BreedingOptions {
    mutationChance?: number;
    mutationAmount?: number;
}
/**
 * Breed two horses to create offspring genes
 * Each parent passes one random allele per stat
 */
export declare function breedGenes(sireGenes: GeneMap, damGenes: GeneMap, options?: BreedingOptions): GeneMap;
/**
 * Inherit personality from parents with variation
 */
export declare function inheritPersonality(sirePersonality: Personality, damPersonality: Personality): Personality;
/**
 * Generate random genes for a foundation horse
 */
export declare function generateRandomGenes(minPotential?: number, maxPotential?: number): GeneMap;
/**
 * Generate random personality
 */
export declare function generateRandomPersonality(): Personality;
/**
 * Validate breeding eligibility
 */
export interface BreedingValidation {
    canBreed: boolean;
    reason?: string;
}
export declare function validateBreeding(sireAge: number, damAge: number, sireGender: string, damGender: string): BreedingValidation;

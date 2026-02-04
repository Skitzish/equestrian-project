"use strict";
/**
 * Breeding Genetics
 * Logic for creating offspring from two parents
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.breedGenes = breedGenes;
exports.inheritPersonality = inheritPersonality;
exports.generateRandomGenes = generateRandomGenes;
exports.generateRandomPersonality = generateRandomPersonality;
exports.validateBreeding = validateBreeding;
const DEFAULT_BREEDING_OPTIONS = {
    mutationChance: 0.05, // 5% chance per allele
    mutationAmount: 5, // +/- 5 points max
};
/**
 * Breed two horses to create offspring genes
 * Each parent passes one random allele per stat
 */
function breedGenes(sireGenes, damGenes, options = {}) {
    const opts = { ...DEFAULT_BREEDING_OPTIONS, ...options };
    const foalGenes = {};
    for (const stat in sireGenes) {
        const statName = stat;
        const sireAllele = randomAllele(sireGenes[statName]);
        const damAllele = randomAllele(damGenes[statName]);
        // Apply possible mutations
        const mutatedSireAllele = applyMutation(sireAllele, opts.mutationChance, opts.mutationAmount);
        const mutatedDamAllele = applyMutation(damAllele, opts.mutationChance, opts.mutationAmount);
        foalGenes[statName] = [mutatedSireAllele, mutatedDamAllele];
    }
    return foalGenes;
}
/**
 * Randomly select one allele from a gene pair
 */
function randomAllele(genePair) {
    return Math.random() < 0.5 ? genePair[0] : genePair[1];
}
/**
 * Apply mutation to an allele
 */
function applyMutation(allele, mutationChance, mutationAmount) {
    if (Math.random() > mutationChance) {
        return allele; // No mutation
    }
    // Random mutation: +/- mutationAmount
    const mutation = (Math.random() * 2 - 1) * mutationAmount;
    const mutated = allele + mutation;
    // Clamp to valid range
    return Math.max(0, Math.min(100, mutated));
}
/**
 * Inherit personality from parents with variation
 */
function inheritPersonality(sirePersonality, damPersonality) {
    // Get numeric values
    const sireValue = getPersonalityNumericValue(sirePersonality);
    const damValue = getPersonalityNumericValue(damPersonality);
    // Average with some random variation
    const avgValue = (sireValue + damValue) / 2;
    const variation = (Math.random() * 2 - 1) * 1.5; // +/- 1.5 positions
    const foalValue = Math.round(avgValue + variation);
    // Clamp to valid range (0-10)
    const clampedValue = Math.max(0, Math.min(10, foalValue));
    return getPersonalityFromNumericValue(clampedValue);
}
/**
 * Convert personality to numeric value for inheritance
 */
function getPersonalityNumericValue(personality) {
    const personalities = [
        'Recalcitrant', // 0
        'Intractable', // 1
        'Stubborn', // 2
        'Aloof', // 3
        'Timid', // 4
        'Indifferent', // 5
        'Curious', // 6
        'Personable', // 7
        'Willing', // 8
        'Amiable', // 9
        'Bold', // 10
    ];
    return personalities.indexOf(personality);
}
/**
 * Convert numeric value back to personality
 */
function getPersonalityFromNumericValue(value) {
    const personalities = [
        'Recalcitrant',
        'Intractable',
        'Stubborn',
        'Aloof',
        'Timid',
        'Indifferent',
        'Curious',
        'Personable',
        'Willing',
        'Amiable',
        'Bold',
    ];
    return personalities[value];
}
/**
 * Generate random genes for a foundation horse
 */
function generateRandomGenes(minPotential = 40, maxPotential = 80) {
    const stats = [
        'strength', 'speed', 'agility', 'balance', 'stamina', 'movement', 'tempo',
        'bravery', 'competitiveness', 'flexibility', 'intelligence', 'loyalty', 'sociability', 'stolidity'
    ];
    const genes = {};
    for (const stat of stats) {
        const allele1 = randomInRange(minPotential, maxPotential);
        const allele2 = randomInRange(minPotential, maxPotential);
        genes[stat] = [allele1, allele2];
    }
    return genes;
}
/**
 * Generate random value in range
 */
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Generate random personality
 */
function generateRandomPersonality() {
    const personalities = [
        'Recalcitrant',
        'Intractable',
        'Stubborn',
        'Aloof',
        'Timid',
        'Indifferent',
        'Curious',
        'Personable',
        'Willing',
        'Amiable',
        'Bold',
    ];
    return personalities[Math.floor(Math.random() * personalities.length)];
}
function validateBreeding(sireAge, damAge, sireGender, damGender) {
    if (sireGender !== 'stallion') {
        return { canBreed: false, reason: 'Sire must be a stallion' };
    }
    if (damGender !== 'mare') {
        return { canBreed: false, reason: 'Dam must be a mare' };
    }
    if (sireAge < 3) {
        return { canBreed: false, reason: 'Sire must be at least 3 years old' };
    }
    if (damAge < 3) {
        return { canBreed: false, reason: 'Dam must be at least 3 years old' };
    }
    return { canBreed: true };
}

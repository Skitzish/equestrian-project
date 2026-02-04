"use strict";
/**
 * Genetics Type Definitions
 * Core types for the genetic system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePotential = calculatePotential;
exports.getStarRating = getStarRating;
exports.isValidAllele = isValidAllele;
exports.validateGeneMap = validateGeneMap;
/**
 * Calculate the potential (average of two alleles)
 */
function calculatePotential(genePair) {
    return (genePair[0] + genePair[1]) / 2;
}
/**
 * Star rating based on potential (1-5 stars)
 */
function getStarRating(potential) {
    if (potential >= 90)
        return 5; // Elite
    if (potential >= 75)
        return 4; // Excellent
    if (potential >= 60)
        return 3; // Good
    if (potential >= 45)
        return 2; // Average
    return 1; // Poor
}
/**
 * Validate that an allele is within valid range
 */
function isValidAllele(value) {
    return value >= 0 && value <= 100;
}
/**
 * Validate an entire gene map
 */
function validateGeneMap(genes) {
    const requiredStats = [
        'strength', 'speed', 'agility', 'balance', 'stamina', 'movement', 'tempo',
        'bravery', 'competitiveness', 'flexibility', 'intelligence', 'loyalty', 'sociability', 'stolidity'
    ];
    for (const stat of requiredStats) {
        if (!genes[stat])
            return false;
        const [allele1, allele2] = genes[stat];
        if (!isValidAllele(allele1) || !isValidAllele(allele2))
            return false;
    }
    return true;
}

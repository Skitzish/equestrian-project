"use strict";
/**
 * Horse Type Definition
 * Complete type for a horse including genetics, stats, skills, and mental state
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEffectiveStats = calculateEffectiveStats;
exports.initializeTrainingLevels = initializeTrainingLevels;
exports.initializeSkillLevels = initializeSkillLevels;
exports.createFoal = createFoal;
const genetics_types_1 = require("./genetics.types");
/**
 * Calculate effective stats from genes and training
 */
function calculateEffectiveStats(genes, training) {
    const stats = {};
    for (const stat in genes) {
        const statName = stat;
        const potential = (0, genetics_types_1.calculatePotential)(genes[statName]);
        const trained = training[statName] || 0;
        const effective = potential * trained;
        stats[statName] = {
            potential,
            trained,
            effective,
            stars: getStarRating(potential)
        };
    }
    return stats;
}
/**
 * Get star rating for potential
 */
function getStarRating(potential) {
    if (potential >= 90)
        return 5;
    if (potential >= 75)
        return 4;
    if (potential >= 60)
        return 3;
    if (potential >= 45)
        return 2;
    return 1;
}
/**
 * Initialize default training levels (all 0)
 */
function initializeTrainingLevels() {
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
function initializeSkillLevels() {
    return {};
}
/**
 * Create a new foal
 */
function createFoal(name, gender, genes, visualGenetics, sire, dam, ownerId, personality, sireGeneration = 0, damGeneration = 0) {
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

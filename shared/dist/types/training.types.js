"use strict";
/**
 * Training Type Definitions
 * Types for skills, training sessions, and results
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrainerSkillModifier = getTrainerSkillModifier;
/**
 * Calculate trainer skill modifier (TSM) for formula
 */
function getTrainerSkillModifier(trainer) {
    // 0 skill = 0.75, 100 skill = 1.25
    return 0.75 + (trainer.skillLevel / 100) * 0.5;
}

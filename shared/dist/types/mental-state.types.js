"use strict";
/**
 * Mental State Type Definitions
 * Types for personality, mood, satisfaction, and bonds
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PERSONALITY_REQUIREMENT_MODIFIERS = exports.MOOD_MODIFIERS = exports.PERSONALITY_TRACTABILITY = exports.PERSONALITY_VALUES = void 0;
exports.getPersonalityValue = getPersonalityValue;
/**
 * Personality value for training formula (-20 to +20)
 */
exports.PERSONALITY_VALUES = {
    'Recalcitrant': -10,
    'Intractable': -7,
    'Stubborn': -5,
    'Aloof': -3,
    'Timid': -1,
    'Indifferent': 0,
    'Curious': 1,
    'Personable': 2,
    'Willing': 4,
    'Amiable': 5,
    'Bold': 'variable', // -3 to +8, influenced by bond
};
/**
 * Personality tractability (for Confused → Intrigued vs Anxious)
 * Positive = tractable (more likely Intrigued)
 * Negative = stubborn (more likely Anxious)
 */
exports.PERSONALITY_TRACTABILITY = {
    'Recalcitrant': -10,
    'Intractable': -8,
    'Stubborn': -6,
    'Aloof': -3,
    'Timid': -2,
    'Indifferent': 0,
    'Curious': 3,
    'Personable': 5,
    'Willing': 7,
    'Amiable': 8,
    'Bold': 2,
};
/**
 * Mood modifiers for training formula (0-1.4)
 */
exports.MOOD_MODIFIERS = {
    // Cannot train effectively
    'Shut-down': 0,
    // Severely impaired
    'Burnt Out': 0.3,
    'Depressed': 0.2,
    // Below average
    'Tired': 0.6,
    'Withdrawn': 0.5,
    'Anxious': 0.5,
    'Grumpy': 0.7,
    // Average
    'Apathetic': 1.0,
    'Calm': 1.0,
    'Satisfied': 1.0,
    // Above average
    'Cheerful': 1.1,
    'Perky': 1.15,
    'Eager': 1.2,
    'Focused': 1.4,
    // Special cases (actual value calculated dynamically)
    'Pent-up': 1.0, // Modified by skill type
    'Energetic': 1.25,
    'Sassy': 1.0, // Highly variable 0.9-1.5
    'Confused': 1.0,
    'Intrigued': 1.3,
};
/**
 * Get personality value for training formula
 * For Bold, pass in the bond level (0-100)
 */
function getPersonalityValue(personality, bondLevel = 0) {
    const value = exports.PERSONALITY_VALUES[personality];
    if (value === 'variable') {
        // Bold personality: -3 to +8, influenced by bond
        const baseBold = Math.random() * 11 - 3; // -3 to +8
        const bondInfluence = bondLevel / 100; // 0-1
        return baseBold + (bondInfluence * 5); // Shifts toward positive with higher bond
    }
    return value;
}
exports.PERSONALITY_REQUIREMENT_MODIFIERS = {
    'Recalcitrant': { exercise: 0.8, stimulation: 0.8, socialization: 0.7 },
    'Intractable': { exercise: 0.8, stimulation: 0.8, socialization: 0.7 },
    'Stubborn': { exercise: 0.9, stimulation: 0.9, socialization: 0.8 },
    'Aloof': { exercise: 1.0, stimulation: 1.0, socialization: 0.6 },
    'Timid': { exercise: 0.9, stimulation: 1.1, socialization: 1.2 },
    'Indifferent': { exercise: 1.0, stimulation: 1.0, socialization: 1.0 },
    'Curious': { exercise: 1.1, stimulation: 1.3, socialization: 1.1 },
    'Personable': { exercise: 1.0, stimulation: 1.1, socialization: 1.4 },
    'Willing': { exercise: 1.2, stimulation: 1.1, socialization: 1.2 },
    'Amiable': { exercise: 1.1, stimulation: 1.0, socialization: 1.3 },
    'Bold': { exercise: 1.3, stimulation: 1.2, socialization: 0.9 },
};

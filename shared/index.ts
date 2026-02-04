/**
 * Equestrian Legacy - Shared Module
 * Core game logic for genetics, training, and mental state
 */

// ========== TYPES ==========
export * from './types/genetics.types';
export * from './types/mental-state.types';
export * from './types/training.types';
export * from './types/horse.types';
export * from './types/visual-genetics.types';

// ========== GENETICS ==========
export * from './genetics/breeding';
export * from './genetics/phenotype';

// ========== VISUAL GENETICS ==========
export * from './visual-genetics/color-calculator';
export * from './visual-genetics/color-generator';
export * from './visual-genetics/color-breeding';

// ========== SKILLS ==========
export * from './skills/skill-definitions';
export * from './skills/skill-validation';

// ========== TRAINING ==========
export * from './training/training-formula';
export * from './training/mood-system';
export * from './training/satisfaction-system';

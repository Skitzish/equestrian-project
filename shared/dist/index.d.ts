/**
 * Equestrian Legacy - Shared Module
 * Core game logic for genetics, training, and mental state
 */
export * from './types/genetics.types';
export * from './types/mental-state.types';
export * from './types/training.types';
export * from './types/horse.types';
export * from './types/visual-genetics.types';
export * from './types/conformation-genetics.types';
export * from './genetics/breeding';
export * from './genetics/phenotype';
export * from './visual-genetics/color-calculator';
export * from './visual-genetics/color-generator';
export * from './visual-genetics/color-breeding';
export * from './conformation-genetics/conformation-breeding';
export * from './conformation-genetics/conformation-generator';
export * from './skills/skill-definitions';
export * from './skills/skill-validation';
export * from './training/training-formula';
export * from './training/mood-system';
export * from './training/satisfaction-system';

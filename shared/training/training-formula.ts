/**
 * Training Formula
 * Implementation of the complete training formula
 */

import { Horse, TrainingLevels } from '../types/horse.types';
import { Trainer, SessionDuration, TrainingResult, getTrainerSkillModifier } from '../types/training.types';
import { StatName } from '../types/genetics.types';
import { MOOD_MODIFIERS, getPersonalityValue } from '../types/mental-state.types';
import { getSkill } from '../skills/skill-definitions';
import { getFatigueModifier, updateFatigue, checkMoodTransition, checkForConfusion } from './mood-system';
import { calculateTrainingSatisfaction } from './satisfaction-system';
import { SkillDefinition } from '../types/training.types';
/**
 * Training formula constants
 */
const FIXED_BOND_MODIFIER = 5; // Temporary until bond system is implemented

/**
 * Apply training session to a horse
 * 
 * Formula: SV = FM * (((BTV - PTM) * TSM) * (((Tr + PV) * MM) + BM))
 */
export function applyTraining(
  horse: Horse,
  skillId: string,
  duration: SessionDuration,
  trainer: Trainer
): TrainingResult {
  const skill = getSkill(skillId);
  
  if (!skill) {
    return {
      success: false,
      skillGained: 0,
      statsGained: {},
      fatigueGained: 0,
      message: `Skill '${skillId}' not found.`,
    };
  }
  
  // Get current skill level
  const currentSkillLevel = horse.skills[skillId] || 0;
  
  // Calculate session value using formula
  const sessionValue = calculateSessionValue(
    horse,
    skillId,
    currentSkillLevel,
    trainer,
    duration
  );
  
  // Determine success/failure
  const success = sessionValue > 0;
  
  // Update skill level (can be negative for bad sessions)
  const newSkillLevel = Math.max(0, Math.min(100, currentSkillLevel + sessionValue));
  const skillGained = newSkillLevel - currentSkillLevel;
  
  // Update stats based on skill contributions
  const statsGained = updateStatsFromSkill(horse, skill.statContributions, Math.abs(skillGained));
  
  // Update fatigue
  let fatigueGained: number;
  if (skill.category === 'care'){
    const fatigueReduced = duration * 0.5;
    fatigueGained = -Math.min(fatigueReduced, horse.mentalState.fatigue); // Can't go below 0
  } else {
    fatigueGained = updateFatigue(horse.mentalState.fatigue, duration, skill.isPhysical) - horse.mentalState.fatigue;
  }
  
  // Check for mood transitions
  let moodChanged = false;
  let newMood = horse.mentalState.mood;
  
  // Check for confusion
  if (checkForConfusion(horse.mentalState.mood, currentSkillLevel)) {
    moodChanged = true;
    newMood = 'Confused';
  } else {
    // Check for other mood transitions
    const transition = checkMoodTransition(horse, skillId, skill.isPhysical);
    if (transition) {
      moodChanged = true;
      newMood = transition;
    }
  }
  
  // Update satisfaction
  const satisfactionGained = calculateTrainingSatisfaction(skillId, duration, skill.isPhysical);
  
  // Generate message
  const message = generateTrainingMessage(
    horse.name,
    skill.name,
    success,
    skillGained,
    horse.mentalState.personality,
    newMood
  );
  
  return {
    success,
    skillGained,
    statsGained,
    fatigueGained,
    moodChanged,
    newMood: moodChanged ? newMood : undefined,
    message,
  };
}

/**
 * Calculate session value using the formula
 * SV = FM * (((BTV - PTM) * TSM) * (((Tr + PV) * MM) + BM))
 */
function calculateSessionValue(
  horse: Horse,
  skillId: string,
  currentSkillLevel: number,
  trainer: Trainer,
  duration: SessionDuration
): number {
  const skill = getSkill(skillId);
  if (!skill) return 0;
  
  // FM - Fatigue Modifier (0.0 - 1.0)
  const FM = getFatigueModifier(horse.mentalState.fatigue);
  
  // BTV - Base Training Value (1-10)
  // In skill definition, higher num = more difficult. The formula works the other way around, so we have to invert it here.
  const BTV = 11 - skill.baseTrainingValue;
  
  // PTM - Previous Training Modifier (0-5, penalty for missing prereqs)
  const PTM = calculatePrerequisiteModifier(horse, skill);

  // Stat Deficiency Modifier (SDM) - reduces effectiveness if stats are below minimum
  let SDM = 0;
  if (skill.minimumStats && skill.minimumStats.length > 0){
    for (const req of skill.minimumStats){
      const effectiveStat = horse.training[req.stat] * 100; // Convert to percentage
      if (effectiveStat < req.minLevel ){
        const shortage = req.minLevel - effectiveStat;
        SDM += shortage * 0.05;
      }
    }
    SDM = Math.min(SDM, 5);
  }
  
  // TSM - Trainer Skill Modifier (0.75 - 1.25)
  const TSM = getTrainerSkillModifier(trainer);
  
  // Tr - Trainability (based on intelligence, 0-100)
  const Tr = (horse.training.intelligence || 0) * 100;
  
  // PV - Personality Value (-20 to +20, variable for Bold)
  const bondLevel = getHighestBondLevel(horse, trainer.id);
  const PV = getPersonalityValue(horse.mentalState.personality, bondLevel);
  
  // MM - Mood Modifier (0 - 1.4)
  const MM = getMoodModifier(horse.mentalState.mood, skill.isPhysical, skillId, horse.mentalState.previousSkill);
  
  // BM - Bond Modifier (0-10, currently fixed)
  const BM = FIXED_BOND_MODIFIER;
  
  // Calculate Combined Training Value
  const CTV = (BTV - PTM - SDM) * TSM;
  
  // Calculate trainability factor
  const trainabilityFactor = ((Tr + PV) * MM) + BM;
  
  // Scale trainability to reasonable range (0-1.3)
  const scaledTrainability = trainabilityFactor / 100;
  
  // Duration multiplier (5min = 0.33x, 15min = 1x, 30min = 2x, 60min = 4x)
  const durationMultiplier = duration / 15;
  
  // Calculate raw session value
  const rawValue = FM * (CTV * scaledTrainability) * durationMultiplier;
  
  // Apply diminishing returns as skill approaches mastery
  const diminishingFactor = 1.0 - (currentSkillLevel / 150); // Slows down after 66%
  
  const finalValue = rawValue * diminishingFactor;
  
  // Clamp to reasonable range (-5 to +10)
  return Math.max(-5, Math.min(10, finalValue));
}

/**
 * Calculate prerequisite modifier (PTM)
 */
function calculatePrerequisiteModifier(horse: Horse, skill: SkillDefinition): number {
  if (!skill.prerequisites || skill.prerequisites.length === 0) {
    return 0;
  }

  let totalShortage = 0;

  for (const prereq of skill.prerequisites) {
    // Check if this is an OR group
    if (prereq.anyOf) {
      // For OR groups, use the BEST option (lowest shortage)
      let minShortage = Infinity;
      
      for (const option of prereq.anyOf) {
        const currentLevel = horse.skills[option.skill] || 0;
        const shortage = Math.max(0, option.minLevel - currentLevel);
        minShortage = Math.min(minShortage, shortage);
      }
      
      totalShortage += minShortage * 0.1;
    } else {
      // Regular single prerequisite
      const currentLevel = horse.skills[prereq.skill!] || 0;
      if (currentLevel < prereq.minLevel!) {
        const shortage = prereq.minLevel! - currentLevel;
        totalShortage += shortage * 0.1;
      }
    }
  }

  return Math.min(totalShortage, 5); // Cap penalty at 5
}

/**
 * Get mood modifier with special cases
 */
function getMoodModifier(
  mood: string,
  isPhysical: boolean,
  currentSkill?: string,
  previousSkill?: string
): number {
  // Special case: Pent-up
  if (mood === 'Pent-up') {
    return isPhysical ? 1.0 : 0.3;
  }
  
  // Special case: Energetic
  if (mood === 'Energetic') {
    return isPhysical ? 1.25 : 0.9;
  }
  
  // Special case: Sassy (variable)
  if (mood === 'Sassy') {
    return 0.9 + (Math.random() * 0.6); // 0.9 - 1.5
  }
  
  // Special case: Confused
  if (mood === 'Confused') {
    return currentSkill === previousSkill ? 1.0 : 0.8;
  }
  
  // Special case: Intrigued
  if (mood === 'Intrigued') {
    return currentSkill === previousSkill ? 1.3 : 1.0;
  }
  
  // Default mood modifiers
  return MOOD_MODIFIERS[mood as keyof typeof MOOD_MODIFIERS] || 1.0;
}

/**
 * Get highest bond level with a person
 */
function getHighestBondLevel(horse: Horse, trainerId: string): number {
  const bond = horse.bonds.find(b => b.personId === trainerId);
  return bond ? bond.level : 0;
}

/**
 * Update stats from skill training
 */
function updateStatsFromSkill(
  horse: Horse,
  contributions: Array<{ stat: StatName; amount: number }>,
  skillGained: number
): Partial<Record<StatName, number>> {
  const statsGained: Partial<Record<StatName, number>> = {};
  
  // Only apply stat gains if skill improved
  if (skillGained <= 0) return statsGained;
  
  for (const contribution of contributions) {
    const currentTraining = horse.training[contribution.stat] || 0;
    const potential = 1.0; // Max potential is 1.0 (100%)
    
    // Diminishing returns as stat approaches potential
    const room = potential - currentTraining;
    const effectiveness = room / potential;
    
    // Calculate stat gain
    const statGain = contribution.amount * skillGained * effectiveness;
    
    // Don't exceed potential
    const newTraining = Math.min(potential, currentTraining + statGain);
    const actualGain = newTraining - currentTraining;
    
    if (actualGain > 0) {
      statsGained[contribution.stat] = actualGain;
    }
  }
  
  return statsGained;
}

/**
 * Generate training message based on personality and result
 */
function generateTrainingMessage(
  horseName: string,
  skillName: string,
  success: boolean,
  skillGained: number,
  personality: string,
  mood: string
): string {
  if (!success || skillGained < 0) {
    // Negative messages for difficult personalities
    if (['Recalcitrant', 'Intractable', 'Stubborn'].includes(personality)) {
      return `${horseName} stubbornly refused to cooperate during ${skillName} training.`;
    }
    if (personality === 'Timid') {
      return `${horseName} was too anxious to make progress in ${skillName}.`;
    }
    return `${horseName} struggled with ${skillName} training today.`;
  }
  
  if (skillGained >= 5) {
    // Excellent progress
    if (['Willing', 'Amiable', 'Curious'].includes(personality)) {
      return `${horseName} eagerly worked on ${skillName} and made excellent progress!`;
    }
    return `${horseName} performed exceptionally well during ${skillName} training!`;
  }
  
  if (skillGained >= 2) {
    // Good progress
    if (['Personable', 'Curious'].includes(personality)) {
      return `${horseName} was engaged and made good progress with ${skillName}.`;
    }
    return `${horseName} made good progress in ${skillName} today.`;
  }
  
  // Small progress
  return `${horseName} made some progress with ${skillName}.`;
}

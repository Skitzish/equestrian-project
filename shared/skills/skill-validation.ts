/**
 * Skill Validation
 * Check if a horse can train a specific skill
 */

import { Horse } from '../types/horse.types';
import { SkillDefinition, TrainingValidation } from '../types/training.types';
import { getSkill, SKILLS } from './skill-definitions';

/**
 * Validate if a horse can train a skill
 */
export function validateSkillTraining(
  horse: Horse,
  skillId: string
): TrainingValidation {
  const skill = getSkill(skillId);
  const isCareSkill = skill?.category === 'care';
  
  if (!skill) {
    return {
      canTrain: false,
      reason: `Skill '${skillId}' not found`,
    };
  }
  
  // Check age requirement (must be at least 2 years old to train)
  if (horse.age < 2) {
    return {
      canTrain: false,
      reason: 'Horse must be at least 2 years old to train',
    };
  }
  
  // Check fatigue (can't train if too tired)
  if (horse.mentalState.fatigue >= 80 && !isCareSkill) {
    return {
      canTrain: false,
      reason: 'Horse is too tired to train (fatigue >= 80%)',
    };
  }
  
  // Check mood (can't train if shut-down)
  if (horse.mentalState.mood === 'Shut-down') {
    return {
      canTrain: false,
      reason: 'Horse is shut-down and cannot train',
    };
  }
  
  // Check prerequisites
  if (skill.prerequisites && skill.prerequisites.length > 0) {
  const missingPrereqs: string[] = [];
  
  for (const prereq of skill.prerequisites) {
    // Check if this is an OR group
    if (prereq.anyOf) {
      // Horse needs at least ONE of these
      const hasAny = prereq.anyOf.some(option => {
        const currentLevel = horse.skills[option.skill] || 0;
        return currentLevel >= option.minLevel;
      });
      
      if (!hasAny) {
        const options = prereq.anyOf.map(opt => 
          `${SKILLS[opt.skill]?.name || opt.skill} ${opt.minLevel}%`
        ).join(' OR ');
        missingPrereqs.push(`Need one of: ${options}`);
      }
    } else {
      // Regular single prerequisite
      const currentLevel = horse.skills[prereq.skill!] || 0;
      if (currentLevel < prereq.minLevel!) {
        missingPrereqs.push(
          `${SKILLS[prereq.skill!]?.name || prereq.skill} (need ${prereq.minLevel}%, have ${currentLevel.toFixed(1)}%)`
        );
      }
    }
  }
  
  if (missingPrereqs.length > 0) {
    return {
      canTrain: false,
      reason: `Missing prerequisites: ${missingPrereqs.join(', ')}`,
    };
  }
}
  
  // Check minimum stats
  //const missingStats = skill.minimumStats.filter(req => {
  //  const trained = horse.training[req.stat] || 0;
  //  return trained < req.minLevel;
  //});
  
  //if (missingStats.length > 0) {
  //  return {
  //    canTrain: false,
   //   reason: 'Insufficient stat training levels',
  //    missingStats,
  //  };
  //}
  
  // All checks passed
  return {
    canTrain: true,
  };
}

/**
 * Get all skills a horse can currently train
 */
export function getTrainableSkills(horse: Horse): SkillDefinition[] {
  const { SKILLS } = require('./skill-definitions');
  const trainableSkills: SkillDefinition[] = [];
  
  for (const skillId in SKILLS) {
    const validation = validateSkillTraining(horse, skillId);
    if (validation.canTrain) {
      trainableSkills.push(SKILLS[skillId]);
    }
  }
  
  return trainableSkills;
}

/**
 * Get next skills a horse could unlock (missing 1-2 prerequisites)
 */
export function getNextSkills(horse: Horse): SkillDefinition[] {
  const { SKILLS } = require('./skill-definitions');
  const nextSkills: SkillDefinition[] = [];
  
  for (const skillId in SKILLS) {
    const validation = validateSkillTraining(horse, skillId);
    
    // Only include skills that are blocked by prerequisites or stats
    if (!validation.canTrain && 
        (validation.missingPrerequisites || validation.missingStats)) {
      nextSkills.push(SKILLS[skillId]);
    }
  }
  
  return nextSkills;
}

/**
 * Calculate skill progression percentage (0-100)
 * Shows how much of the skill tree the horse has completed
 */
export function calculateSkillProgress(horse: Horse): number {
  const { SKILLS } = require('./skill-definitions');
  const totalSkills = Object.keys(SKILLS).length;
  let completedSkills = 0;
  
  for (const skillId in SKILLS) {
    const level = horse.skills[skillId] || 0;
    if (level >= 80) { // Consider skill "completed" at 80+
      completedSkills++;
    }
  }
  
  return (completedSkills / totalSkills) * 100;
}

/**
 * Get skill mastery level description
 */
export function getSkillMasteryLevel(level: number): string {
  if (level >= 90) return 'Master';
  if (level >= 75) return 'Expert';
  if (level >= 60) return 'Proficient';
  if (level >= 40) return 'Competent';
  if (level >= 20) return 'Novice';
  if (level > 0) return 'Beginner';
  return 'Untrained';
}

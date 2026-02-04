/**
 * Example Usage
 * Demonstrates how to use the shared game logic
 */

import { 
  generateRandomGenes, 
  generateRandomPersonality,
  breedGenes,
  inheritPersonality,
  calculatePhenotype,
  applyTraining,
  validateSkillTraining,
  calculateDailyMood,
  SKILLS,
  Horse,
  Gender,
  HousingType
} from './index';

// ========== EXAMPLE 1: Create a Foundation Horse ==========
console.log('=== EXAMPLE 1: Creating a Foundation Horse ===\n');

const genes = generateRandomGenes(50, 80);
const personality = generateRandomPersonality();

const foundationHorse: Partial<Horse> = {
  id: 'horse_001',
  name: 'Thunder',
  age: 3,
  gender: 'stallion' as Gender,
  genes,
  training: {
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
  },
  skills: {},
  mentalState: {
    personality,
    mood: 'Calm',
    fatigue: 0,
  },
  housing: 'pasture' as HousingType,
  satisfaction: {
    exercise: { current: 0, required: 0 },
    stimulation: { current: 0, required: 0 },
    nutrition: { current: 100, required: 80 },
    socialization: { current: 0, required: 0 },
  },
  bonds: [],
};

console.log(`Created: ${foundationHorse.name}`);
console.log(`Personality: ${foundationHorse.mentalState?.personality}`);
console.log(`Strength Potential: ${((genes.strength[0] + genes.strength[1]) / 2).toFixed(1)}`);
console.log(`Speed Potential: ${((genes.speed[0] + genes.speed[1]) / 2).toFixed(1)}`);
console.log(`Bravery Potential: ${((genes.bravery[0] + genes.bravery[1]) / 2).toFixed(1)}\n`);

// ========== EXAMPLE 2: Training Session ==========
console.log('=== EXAMPLE 2: Training Session ===\n');

const trainer = {
  id: 'trainer_001',
  name: 'Player',
  skillLevel: 50, // Moderate skill
};

// Check if horse can train haltering
const validation = validateSkillTraining(foundationHorse as Horse, 'haltering');
console.log(`Can train haltering? ${validation.canTrain}`);

if (validation.canTrain) {
  // Train for 15 minutes
  const result = applyTraining(
    foundationHorse as Horse,
    'haltering',
    15,
    trainer
  );
  
  console.log(`\nTraining Result:`);
  console.log(`Success: ${result.success}`);
  console.log(`Skill Gained: ${result.skillGained.toFixed(2)} points`);
  console.log(`Stats Gained:`);
  for (const [stat, gain] of Object.entries(result.statsGained)) {
    console.log(`  ${stat}: +${(gain * 100).toFixed(2)}%`);
  }
  console.log(`Fatigue Gained: ${result.fatigueGained.toFixed(1)}`);
  console.log(`Message: "${result.message}"\n`);
}

// ========== EXAMPLE 3: Breeding ==========
console.log('=== EXAMPLE 3: Breeding Two Horses ===\n');

// Create a mare
const mareGenes = generateRandomGenes(60, 85);
const marePersonality = generateRandomPersonality();

const mare: Partial<Horse> = {
  id: 'horse_002',
  name: 'Lightning',
  age: 5,
  gender: 'mare' as Gender,
  genes: mareGenes,
  mentalState: {
    personality: marePersonality,
    mood: 'Calm',
    fatigue: 0,
  },
};

console.log(`Sire: ${foundationHorse.name} (${foundationHorse.mentalState?.personality})`);
console.log(`Dam: ${mare.name} (${mare.mentalState?.personality})`);

// Breed
const foalGenes = breedGenes(genes, mareGenes);
const foalPersonality = inheritPersonality(
  foundationHorse.mentalState!.personality,
  mare.mentalState!.personality
);

console.log(`\nFoal Genetics:`);
console.log(`Personality: ${foalPersonality}`);
console.log(`Strength Potential: ${((foalGenes.strength[0] + foalGenes.strength[1]) / 2).toFixed(1)} (Sire: ${((genes.strength[0] + genes.strength[1]) / 2).toFixed(1)}, Dam: ${((mareGenes.strength[0] + mareGenes.strength[1]) / 2).toFixed(1)})`);
console.log(`Speed Potential: ${((foalGenes.speed[0] + foalGenes.speed[1]) / 2).toFixed(1)} (Sire: ${((genes.speed[0] + genes.speed[1]) / 2).toFixed(1)}, Dam: ${((mareGenes.speed[0] + mareGenes.speed[1]) / 2).toFixed(1)})`);
console.log(`Bravery Potential: ${((foalGenes.bravery[0] + foalGenes.bravery[1]) / 2).toFixed(1)} (Sire: ${((genes.bravery[0] + genes.bravery[1]) / 2).toFixed(1)}, Dam: ${((mareGenes.bravery[0] + mareGenes.bravery[1]) / 2).toFixed(1)})\n`);

// ========== EXAMPLE 4: Skill Progression ==========
console.log('=== EXAMPLE 4: Skill Progression Path ===\n');

const haltering = SKILLS['haltering'];
const leading = SKILLS['leading'];
const tying = SKILLS['tying'];

console.log(`Foundation Skill: ${haltering.name}`);
console.log(`  Prerequisites: ${haltering.prerequisites.length === 0 ? 'None' : haltering.prerequisites.map(p => p.skill).join(', ')}`);
console.log(`  Base Training Value: ${haltering.baseTrainingValue} (${haltering.baseTrainingValue >= 7 ? 'Easy' : haltering.baseTrainingValue >= 4 ? 'Moderate' : 'Hard'})`);

console.log(`\n${leading.name}:`);
console.log(`  Prerequisites: ${leading.prerequisites.map(p => `${p.skill} (${p.minLevel}%)`).join(', ')}`);
console.log(`  Base Training Value: ${leading.baseTrainingValue}`);

console.log(`\n${tying.name}:`);
console.log(`  Prerequisites: ${tying.prerequisites.map(p => `${p.skill} (${p.minLevel}%)`).join(', ')}`);
console.log(`  Base Training Value: ${tying.baseTrainingValue}`);

console.log('\n=== Examples Complete ===');
console.log('\nThe shared module is ready to use in your backend and frontend!');

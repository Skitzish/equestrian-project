# Equestrian Legacy - Shared Game Logic

This module contains all the core game logic for the Equestrian Legacy horse training and breeding simulation. It's designed to be used by both the backend (NestJS) and frontend (React), ensuring consistent game mechanics across the entire application.

## Overview

The shared module implements:
- **Genetics System**: Breeding, inheritance, and phenotype calculation
- **Training System**: Complex training formula with stats, skills, and progression
- **Mental State**: Personality, mood, satisfaction, and bonds
- **Skills**: 14 trainable skills with prerequisites and stat requirements

## Architecture

### Pure TypeScript
All code is pure TypeScript with no external dependencies. This ensures:
- Easy testing in isolation
- Use in both Node.js (backend) and browser (frontend)
- No framework coupling

### Type-First Design
Every concept is modeled as a TypeScript type/interface, providing:
- Excellent IDE autocomplete
- Compile-time type safety
- Self-documenting code

## Directory Structure

```
shared/
├── types/               # Type definitions
│   ├── genetics.types.ts
│   ├── mental-state.types.ts
│   ├── training.types.ts
│   └── horse.types.ts
├── genetics/            # Breeding and phenotype
│   ├── breeding.ts
│   └── phenotype.ts
├── skills/              # Skill definitions
│   ├── skill-definitions.ts
│   └── skill-validation.ts
└── training/            # Training mechanics
    ├── training-formula.ts
    ├── mood-system.ts
    └── satisfaction-system.ts
```

## Key Concepts

### Genetics

Each horse has **14 stats** (7 physical, 7 mental). Each stat has **two alleles** (0-100) inherited from parents.

**Potential** = Average of two alleles
**Effective Stat** = Potential × Training Level

```typescript
horse.genes.strength = [67, 82]  // Inherited from parents
// Potential = (67 + 82) / 2 = 74.5
// If trained to 35%: effective strength = 74.5 × 0.35 = 26
```

### Training

Training uses your detailed formula:

**SV = FM × (((BTV - PTM) × TSM) × (((Tr + PV) × MM) + BM))**

Where:
- **FM**: Fatigue Modifier (0-1, based on horse energy)
- **BTV**: Base Training Value (skill difficulty, 1-10)
- **PTM**: Prerequisite Modifier (penalty for missing skills)
- **TSM**: Trainer Skill Modifier (0.75-1.25)
- **Tr**: Trainability (intelligence stat, 0-100)
- **PV**: Personality Value (-20 to +20)
- **MM**: Mood Modifier (0-1.4)
- **BM**: Bond Modifier (0-10)

### Skills

Skills have:
- **Prerequisites**: Other skills that must be learned first
- **Minimum Stats**: Required stat training levels
- **Stat Influences**: Stats that make learning easier
- **Stat Contributions**: Stats that improve from training this skill

Example: Jumping requires:
- Prerequisites: Trotting (70%), Cantering (60%)
- Minimum Stats: Strength (30%), Balance (30%), Agility (25%)
- Develops: Strength, Agility, Balance, Bravery

### Mental State

Three layers:
1. **Personality** (fixed): Recalcitrant → Amiable → Bold (11 types)
2. **Mood** (daily): Shut-down → Focused (18 types)
3. **Satisfaction** (daily): Exercise, Stimulation, Nutrition, Socialization

Mood is calculated daily based on satisfaction. Special moods:
- **Focused**: Exceptional learning (1.4× multiplier)
- **Intrigued**: Great learning on specific skill (1.3×)
- **Confused**: Uncertain, needs direction
- **Shut-down**: Cannot train at all

## Usage Examples

### Creating a Horse

```typescript
import { generateRandomGenes, generateRandomPersonality, createFoal } from '@equestrian-legacy/shared';

// Generate starter horse
const genes = generateRandomGenes(50, 80); // 50-80 potential range
const personality = generateRandomPersonality();

const horse = {
  id: 'horse_123',
  name: 'Storm Chaser',
  age: 3,
  gender: 'stallion',
  genes,
  mentalState: {
    personality,
    mood: 'Calm',
    fatigue: 0
  },
  // ... other properties
};
```

### Breeding

```typescript
import { breedGenes, inheritPersonality } from '@equestrian-legacy/shared';

const foalGenes = breedGenes(sire.genes, dam.genes);
const foalPersonality = inheritPersonality(sire.mentalState.personality, dam.mentalState.personality);
```

### Training

```typescript
import { applyTraining, validateSkillTraining } from '@equestrian-legacy/shared';

// Check if horse can train
const validation = validateSkillTraining(horse, 'haltering');

if (validation.canTrain) {
  const result = applyTraining(horse, 'haltering', 15, trainer);
  
  console.log(result.message); // "Storm Chaser eagerly worked on Haltering..."
  console.log(result.skillGained); // 3.2
  console.log(result.statsGained); // { bravery: 0.032, intelligence: 0.016 }
  
  // Update horse
  horse.skills.haltering += result.skillGained;
  horse.training.bravery += result.statsGained.bravery;
  // ... etc
}
```

### Daily Mood Update

```typescript
import { calculateDailyMood, reduceFatigue } from '@equestrian-legacy/shared';

// Start of new day
horse.mentalState.mood = calculateDailyMood(horse);
horse.mentalState.fatigue = reduceFatigue(horse.mentalState.fatigue, 20);
```

## Expanding the System

### Adding New Skills

Edit `shared/skills/skill-definitions.ts`:

```typescript
export const SKILLS = {
  // ... existing skills
  
  my_new_skill: {
    id: 'my_new_skill',
    name: 'My New Skill',
    category: 'discipline',
    description: 'What this skill teaches',
    baseTrainingValue: 3, // 1-10, lower = harder
    prerequisites: [
      { skill: 'some_skill', minLevel: 50 }
    ],
    minimumStats: [
      { stat: 'strength', minLevel: 0.30 }
    ],
    statInfluences: [
      { stat: 'strength', weight: 0.4 }
    ],
    statContributions: [
      { stat: 'strength', amount: 0.05 }
    ],
    isPhysical: true
  }
};
```

### Adding New Stats (later)

When you're ready to add the remaining 9 stats:

1. Update `types/genetics.types.ts`: Add to GeneMap
2. Update `types/horse.types.ts`: Add to initializeTrainingLevels()
3. Update skill definitions: Add stat influences/contributions
4. All formulas automatically work with new stats!

## Testing

You can test the game logic directly:

```typescript
// Create test horse
const testHorse = {
  genes: { strength: [70, 80], /* ... */ },
  training: { strength: 0.20, /* ... */ },
  skills: { haltering: 45 },
  mentalState: {
    personality: 'Curious',
    mood: 'Cheerful',
    fatigue: 30
  },
  // ... etc
};

// Test training
const trainer = { id: 'trainer_1', name: 'Player', skillLevel: 50 };
const result = applyTraining(testHorse, 'leading', 15, trainer);

console.log(result); // See what happens!
```

## Integration with Backend/Frontend

### Backend (NestJS)
```typescript
import { applyTraining } from '@equestrian-legacy/shared';

@Post('/train')
async trainHorse(@Body() dto: TrainHorseDto) {
  const horse = await this.horsesService.findOne(dto.horseId);
  const trainer = await this.trainersService.findOne(dto.trainerId);
  
  const result = applyTraining(horse, dto.skillId, dto.duration, trainer);
  
  // Update database
  await this.horsesService.update(horse.id, {
    skills: { ...horse.skills, [dto.skillId]: horse.skills[dto.skillId] + result.skillGained },
    training: { /* update from result.statsGained */ }
  });
  
  return result;
}
```

### Frontend (React)
```typescript
import { validateSkillTraining, SKILLS } from '@equestrian-legacy/shared';

function TrainingView({ horse }) {
  const trainableSkills = Object.values(SKILLS).filter(skill => 
    validateSkillTraining(horse, skill.id).canTrain
  );
  
  return (
    <div>
      {trainableSkills.map(skill => (
        <SkillButton key={skill.id} skill={skill} onClick={() => train(skill.id)} />
      ))}
    </div>
  );
}
```

## Next Steps

This shared module is complete and ready to use! The next phase is:

1. **Backend (NestJS)**: Create REST API that uses these functions
2. **Frontend (React)**: Create UI that displays and interacts with game state
3. **Database (MongoDB)**: Store horses, users, and game state

The beauty of this architecture is that all game logic is here, tested, and consistent. The backend is just persistence + API, and the frontend is just UI.

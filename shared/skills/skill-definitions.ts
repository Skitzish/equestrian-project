/**
 * Skill Definitions
 * All trainable skills with their properties
 */

import { SkillDefinition } from '../types/training.types';

/**
 * All skill definitions
 * This is the MVP set - expand as needed
 */
export const SKILLS: Record<string, SkillDefinition> = {
  // ========== CARE SKILLS ==========
  brushing: {
    id: 'brushing',
    name: 'Brush',
    category: 'care',
    description: 'Give your horse a good brushing.',
    baseTrainingValue: 1,
    prerequisites: [],
    minimumStats: [],
    statInfluences: [],
    statContributions: [
      { stat: 'sociability', amount: 0.015 },
    ],
    isPhysical: false,
  },
  
  picking_out_feet: {
    id: 'picking_out_feet',
    name: 'Pick Out Feet',
    category: 'care',
    description: 'Pick packed dirt, mud, rocks, etcetera, out of your horse\'s feet.',
    baseTrainingValue: 3,
    prerequisites: [],
    minimumStats: [],
    statInfluences: [],
    statContributions: [
      { stat: 'balance', amount: 0.015 },
      { stat: 'sociability', amount: 0.01 },
    ],
    isPhysical: false,
  },

  bathing: {
    id: 'bathing',
    name: 'Bathing',
    category: 'care',
    description: 'Give your horse a bath.',
    baseTrainingValue: 3,
    prerequisites: [
      { skill: 'haltering', minLevel: 25 },
      {
        anyOf: [
          { skill: 'standing', minLevel: 30 },
          { skill: 'tying', minLevel: 30 }
        ]
      }
    ],
    minimumStats: [],
    statInfluences: [],
    statContributions: [],
    isPhysical: false,
  },

  clipping: {
    id: 'clipping',
    name: 'Clipping',
    category: 'care',
    description: 'Clip your horse to get them ready for shows or winter work.',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'haltering', minLevel: 65 },
      {
        anyOf: [
          { skill: 'standing', minLevel: 50 },
          { skill: 'tying', minLevel: 60 }
        ]
      }
    ],
    minimumStats: [
      { stat: 'stolidity', minLevel: 40 }
    ],
    statInfluences: [],
    statContributions: [],
    isPhysical: false,
  },
  
  // ========== FOUNDATION SKILLS ==========
  haltering: {
    id: 'haltering',
    name: 'Haltering',
    category: 'foundation',
    description: 'Teaching the horse to accept and wear a halter',
    baseTrainingValue: 1,
    prerequisites: [],
    minimumStats: [],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'bravery', amount: 0.005 },
      { stat: 'stolidity', amount: 0.01 },
      { stat: 'intelligence', amount: 0.005 },
    ],
    isPhysical: false,
  },
  
  leading: {
    id: 'leading',
    name: 'Leading',
    category: 'foundation',
    description: 'Teaching the horse to give to pressure and follow when led.',
    baseTrainingValue: 2,
    prerequisites: [
      { skill: 'haltering', minLevel: 25 },
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'bravery', amount: 0.01 },
      { stat: 'balance', amount: 0.01 },
      { stat: 'intelligence', amount: 0.005 },
    ],
    isPhysical: false,
  },
  
  standing: {
    id: 'standing',
    name: 'Standing',
    category: 'foundation',
    description: 'Teaching the horse to stand quietly.',
    baseTrainingValue: 3,
    prerequisites: [
      { skill: 'haltering', minLevel: 20 },
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'stolidity', weight: 0.4 },
      { stat: 'intelligence', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'stolidity', amount: 0.02 },
      { stat: 'intelligence', amount: 0.01 },
    ],
    isPhysical: false,
  },
  
  tying: {
    id: 'tying',
    name: 'Tying',
    category: 'foundation',
    description: 'Teaching the horse to be tied securely',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'haltering', minLevel: 30 },
      { skill: 'leading', minLevel: 25 },
      { skill: 'standing', minLevel: 25 },
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'stolidity', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'flexibility', amount: 0.015 },
      { stat: 'intelligence', amount: 0.01 },
    ],
    isPhysical: false,
  },

  loading: {
    id: 'loading',
    name: 'Loading',
    category: 'foundation',
    description: 'Teaching the horse to load into a trailer for transport.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'haltering', minLevel: 40 },
      { skill: 'leading', minLevel: 40 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'intelligence', weight: 0.15 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.0025 },
      { stat: 'bravery', amount: 0.015 },
      { stat: 'stolidity', amount: 0.0025 },
      { stat: 'flexibility', amount: 0.01 }
    ],
    isPhysical: false,
  },
  
  // ========== GROUND WORK ==========
  teach_voice_cues: {
    id: 'teach_voice_cues',
    name: 'Teach Voice Cues',
    category: 'ground',
    description: 'Teach the horse to respond to verbal commands for different gaits.',
    baseTrainingValue: 4,
    prerequisites: [],
    minimumStats: [],
    statInfluences: [
      { stat: 'intelligence', weight: 0.4 },
      { stat: 'sociability', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'intelligence', amount: 0.06 },
      { stat: 'sociability', amount: 0.03 }
    ],
    isPhysical: false
  },

  lunging_free: {
    id: 'lunging_free',
    name: 'Free Lunging',
    category: 'ground',
    description: 'Teaching the horse to move in a circle around the handler',
    baseTrainingValue: 3,
    prerequisites: [],
    minimumStats: [],
    statInfluences: [
      { stat: 'intelligence', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
      { stat: 'stamina', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.05 },
      { stat: 'balance', amount: 0.025 },
      { stat: 'sociability', amount: 0.025 },
      { stat: 'tempo', amount: 0.025 },
    ],
    isPhysical: true,
  },

  lunging_long_line: {
    id: 'lunging_long_line',
    name: 'Long Line Lunging',
    category: 'ground',
    description: 'Teaching the horse to move in a circle around the handler while on the long line',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'haltering', minLevel: 60 },
      { skill: 'leading', minLevel: 50 }
    ],
    minimumStats: [
      { stat: 'agility', minLevel: 10 }
    ],
    statInfluences: [
      { stat: 'agility', weight: 0.4 },
      { stat: 'balance', weight: 0.3 },
      { stat: 'intelligence', weight: 0.1 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.06 },
      { stat: 'agility', amount: 0.06 },
      { stat: 'stamina', amount: 0.05 },
      { stat: 'intelligence', amount: 0.025 }
    ],
    isPhysical: true,
  },


  tacking_pad_saddle_girth: {
    id: 'tacking_pad_saddle_girth',
    name: 'Saddling Up',
    category: 'ground',
    description: 'Teaching the horse to accept a saddle pad, saddle, and girth',
    baseTrainingValue: 4,
    prerequisites: [
      {
        anyOf: [
          { skill: 'standing', minLevel: 60 },
          { skill: 'tying', minLevel: 35 }
        ]
      }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'stolidity', weight: 0.1 },
      { stat: 'sociability', weight: 0.1 }
    ],
    statContributions: [
      { stat: 'sociability', amount: 0.025 },
      { stat: 'flexibility', amount: 0.025 }
    ],
    isPhysical: false,
  },

  tacking_bridle: {
    id: 'tacking_bridle',
    name: 'Bridling',
    category: 'ground',
    description: 'Teaching the horse to wear a bridle with a bit.',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'haltering', minLevel: 40 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'sociability', weight: 0.1 },
      { stat: 'flexibility', weight: 0.3 }
    ],
    statContributions: [
      { stat: 'flexibility', amount: 0.025 },
      { stat: 'intelligence', amount: 0.025}
    ],
    isPhysical: false,
  },

  tacking_harness: {
    id: 'tacking_harness',
    name: 'Harnessing',
    category: 'ground',
    description: 'Teaching the horse to wear a driving harness.',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'standing', minLevel: 50 },
      { skill: 'tacking_pad_saddle_girth', minLevel: 30 }
    ],
    minimumStats: [
      { stat: 'stolidity', minLevel: 10 }
    ],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'stolidity', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'bravery', amount: 0.05 },
      { stat: 'stolidity', amount: 0.04 },
      { stat: 'flexibility', amount: 0.03 }
    ],
    isPhysical: false,
  },
  
  mounting: {
    id: 'mounting',
    name: 'Mounting',
    category: 'ground',
    description: 'Teaching the horse to accept a rider mounting',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'saddling', minLevel: 50 },
      { skill: 'standing', minLevel: 60 },
    ],
    minimumStats: [
      { stat: 'balance', minLevel: 15 },
    ],
    statInfluences: [
      { stat: 'bravery', weight: 0.2 },
      { stat: 'balance', weight: 0.3 },
      { stat: 'stolidity', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'bravery', amount: 0.04 },
      { stat: 'balance', amount: 0.05 },
      { stat: 'strength', amount: 0.03 },
    ],
    isPhysical: true,
  },
  
  // ========== DRIVING SKILLS ==========

  groundDrive_walk: {
    id: 'groundDrive_walk',
    name: 'Ground Driving - Walk',
    category: 'driving',
    description: 'Teaching the horse to walk forward while driven from behind.',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'long_line_lunging', minLevel: 60 },
      { skill: 'harnessing', minLevel: 50 },
      { skill: 'teach_voice_cues', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'intelligence', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'balance', amount: 0.05 },
      { stat: 'intelligence', amount: 0.04 },
      { stat: 'stamina', amount: 0.03 },
    ],
    isPhysical: false,
  },

  groundDrive_halt: {
    id: 'groundDrive_halt',
    name: 'Ground Driving - Halt',
    category: 'driving',
    description: 'Teaching the horse to halt while driven from behind.',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'ground_driving_walk', minLevel: 40 },
      { skill: 'teach_voice_cues', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'intelligence', weight: 0.3 },
      { stat: 'stolidity', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'balance', amount: 0.04 },
      { stat: 'intelligence', amount: 0.03 },
    ],
    isPhysical: false,
  },

  groundDrive_turning: {
    id: 'groundDrive_turning',
    name: 'Ground Driving - Turning',
    category: 'driving',
    description: 'Teaching the horse to turn right and left while driven from behind.',
    baseTrainingValue: 5,
    prerequisites: [
    { skill: 'ground_driving_walk', minLevel: 50 },
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'agility', amount: 0.05 },
      { stat: 'balance', amount: 0.04 },
      { stat: 'intelligence', amount: 0.03 },
    ],
    isPhysical: false,
  },

  groundDrive_trot: {
    id: 'groundDrive_trot',
    name: 'Ground Driving - Trot',
    category: 'driving',
    description: 'Teaching the horse to trot while driven from behind.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'ground_driving_walk', minLevel: 60 },
      { skill: 'ground_driving_halt', minLevel: 40 },
      { skill: 'teach_voice_cues', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'stamina', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.06 },
      { stat: 'balance', amount: 0.05 },
      { stat: 'agility', amount: 0.03 },
      { stat: 'tempo', amount: 0.03 }
    ],
    isPhysical: false,
  },

  groundDrive_canter: {
    id: 'groundDrive_canter',
    name: 'Ground Driving - Canter',
    category: 'driving',
    description: 'Teaching the horse to canter while driven from behind.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'ground_driving_trot', minLevel: 60 },
      { skill: 'ground_driving_turning', minLevel: 50 },
      { skill: 'teach_voice_cues', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'stamina', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
      { stat: 'agility', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.07 },
      { stat: 'balance', amount: 0.05 },
      { stat: 'agility', amount: 0.04 },
      { stat: 'strength', amount: 0.03 }
    ],
    isPhysical: false,
  },

  groundDrive_back: {
    id: 'groundDrive_back',
    name: 'Ground Driving - Back',
    category: 'driving',
    description: 'Teaching the horse to back while driven from behind.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'ground_driving_halt', minLevel: 60 },
      { skill: 'teach_voice_cues', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'intelligence', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'balance', amount: 0.05 },
      { stat: 'flexibility', amount: 0.04 },
      { stat: 'intelligence', amount: 0.03 },
    ],
    isPhysical: false,
  },

  // ========== RIDING FUNDAMENTALS ==========
  walk_under_saddle: {
    id: 'walk_under_saddle',
    name: 'Walk Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to walk with a rider',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'mounting', minLevel: 60 },
      { skill: 'bridling', minLevel: 50 },
    ],
    minimumStats: [
      { stat: 'balance', minLevel: 0.20 },
      { stat: 'strength', minLevel: 0.15 },
    ],
    statInfluences: [
      { stat: 'balance', weight: 0.3 },
      { stat: 'intelligence', weight: 0.3 },
      { stat: 'bravery', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'balance', amount: 0.06 },
      { stat: 'strength', amount: 0.04 },
      { stat: 'stamina', amount: 0.03 },
      { stat: 'movement', amount: 0.01 },
    ],
    isPhysical: true,
  },
  
  trot_under_saddle: {
    id: 'trot_under_saddle',
    name: 'Trot Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to trot with a rider',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 60 },
      { skill: 'halt_under_saddle', minLevel: 40 }
    ],
    minimumStats: [
      { stat: 'balance', minLevel: 0.25 },
      { stat: 'strength', minLevel: 0.20 },
    ],
    statInfluences: [
      { stat: 'balance', weight: 0.2 },
      { stat: 'stamina', weight: 0.3 }
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.03 },
      { stat: 'balance', amount: 0.02 },
      { stat: 'movement', amount: 0.02 },
      { stat: 'tempo', amount: 0.02 }
    ],
    isPhysical: true,
  },
  
  canter_under_saddle: {
    id: 'canter_under_saddle',
    name: 'Canter Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to canter with a rider',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'trot_under_saddle', minLevel: 60 },
      { skill: 'turn_under_saddle', minLevel: 30 },
      { skill: 'halt_under_saddle', minLevel: 40 }
    ],
    minimumStats: [
      { stat: 'balance', minLevel: 10 },
      { stat: 'strength', minLevel: 10 }
    ],
    statInfluences: [
      { stat: 'balance', weight: 0.2 },
      { stat: 'agility', weight: 0.2 },
      { stat: 'stamina', weight: 0.3 },
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.04 },
      { stat: 'strength', amount: 0.03 },
      { stat: 'balance', amount: 0.02 },
      { stat: 'speed', amount: 0.02 },
    ],
    isPhysical: true,
  },

  halt_under_saddle: {
    id: 'halt_under_saddle',
    name: 'Halt Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to halt while ridden.',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 40 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'balance', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.05 },
      { stat: 'strength', amount: 0.03 }
    ],
    isPhysical: true,
  },

  turn_under_saddle: {
    id: 'turn_under_saddle',
    name: 'Turning Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to turn while ridden.',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 40 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'balance', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.05 },
      { stat: 'balance', amount: 0.04 },
      { stat: 'flexibility', amount: 0.03 }
    ],
    isPhysical: true,
  },

  back_under_saddle: {
    id: 'back_under_saddle',
    name: 'Backing Under Saddle',
    category: 'basicRiding',
    description: 'Teaching the horse to back while ridden.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'halt_under_saddle', minLevel: 60 },
      { skill: 'walk_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'flexibility', weight: 0.3 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'flexibility', amount: 0.05 },
      { stat: 'strength', amount: 0.04 },
      { stat: 'balance', amount: 0.03 }
    ],
    isPhysical: true,
  },
  
  // ========== INTERMEDIATE SKILLS ==========

  hand_gallop: {
    id: 'hand_gallop',
    name: 'Hand Gallop',
    category: 'intermediate',
    description: 'Work the horse at a fast gait between canter and gallop.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'canter_under_saddle', minLevel: 70 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'stamina', weight: 0.3 },
      { stat: 'bravery', weight: 0.2 },
      { stat: 'balance', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'stamina', amount: 0.08 },
      { stat: 'speed', amount: 0.06 },
      { stat: 'strength', amount: 0.05 },
    ],
    isPhysical: true,
  },

  self_carriage: {
    id: 'self_carriage',
    name: 'Self Carriage',
    category: 'intermediate',
    description: 'Teach the horse to carry itself in balance.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 70 },
      { skill: 'trot_under_saddle', minLevel: 70 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'balance', weight: 0.4 },
      { stat: 'strength', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.08 },
      { stat: 'strength', amount: 0.06 },
      { stat: 'stamina', amount: 0.04 }
    ],
    isPhysical: true,
  },

  yield_forehand: {
    id: 'yield_forehand',
    name: 'Yield Forehand',
    category: 'intermediate',
    description: 'Teach the horse to move the front end away from pressure.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'turn_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.06 },
      { stat: 'flexibility', amount: 0.05 },
      { stat: 'balance', amount: 0.03 }
    ],
    isPhysical: true,
  },

  yield_haunches: {
    id: 'yield_haunches',
    name: 'Yield Haunches',
    category: 'intermediate',
    description: 'Teach the horse to move the rear end away from pressure.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'turn_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.06 },
      { stat: 'flexibility', amount: 0.05 },
      { stat: 'balance', amount: 0.03 }
    ],
    isPhysical: true,
  },

  square_halt: {
    id: 'square_halt',
    name: 'Square Halt',
    category: 'intermediate',
    description: 'Teach the horse to perform a square halt.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'halt_under_saddle', minLevel: 70 }
    ],
    minimumStats: [
      { stat: 'balance', minLevel: 45 }
    ],
    statInfluences: [
      { stat: 'balance', weight: 0.4 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.07 },
      { stat: 'strength', amount: 0.04 }
    ],
    isPhysical: true,
  },

  ground_poles_walk: {
    id: 'ground_poles_walk',
    name: 'Ground Poles - Walk',
    category: 'intermediate',
    description: 'Work the horse over ground poles at a walk.',
    baseTrainingValue: 5,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'bravery', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.05 },
      { stat: 'balance', amount: 0.04 },
      { stat: 'bravery', amount: 0.03 }
    ],
    isPhysical: true,
  },

  ground_poles_trot: {
    id: 'ground_poles_trot',
    name: 'Ground Poles - Trot',
    category: 'intermediate',
    description: 'Work the horse over ground poles at a trot.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'trot_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'balance', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.06 },
      { stat: 'balance', amount: 0.05 },
      { stat: 'stamina', amount: 0.03 }
    ],
    isPhysical: true,
  },
  
  ground_poles_canter: {
    id: 'ground_poles_canter',
    name: 'Ground Poles - Canter',
    category: 'intermediate',
    description: 'Work the horse over ground poles at a canter.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'canter_under_saddle', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
      { stat: 'stamina', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.07 },
      { stat: 'balance', amount: 0.05 },
      { stat: 'stamina', amount: 0.04 }
    ],
    isPhysical: true,
  },

  sidepass: {
    id: 'sidepass',
    name: 'Sidepass',
    category: 'intermediate',
    description: 'Teach the horse to move laterally.',
    baseTrainingValue: 8,
    prerequisites: [
      { skill: 'yield_forehand', minLevel: 50 },
      { skill: 'yield_haunches', minLevel: 50 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'flexibility', weight: 0.3 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.07 },
      { stat: 'flexibility', amount: 0.06 },
      { stat: 'balance', amount: 0.04 }
    ],
    isPhysical: true,
  },

  cavaletti: {
    id: 'cavaletti',
    name: 'Cavaletti',
    category: 'intermediate',
    description: 'Work the horse over elevated poles.',
    baseTrainingValue: 7,
    prerequisites: [
      { skill: 'ground_poles_walk', minLevel: 40 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'balance', weight: 0.2 },
      { stat: 'bravery', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.08 },
      { stat: 'balance', amount: 0.06 },
      { stat: 'strength', amount: 0.04 }
    ],
    isPhysical: true,
  },

  transitions: {
    id: 'transitions',
    name: 'Transitions',
    category: 'intermediate',
    description: 'Teach the horse to transition smoothly between gaits.',
    baseTrainingValue: 4,
    prerequisites: [
      { skill: 'walk_under_saddle', minLevel: 30 },
      { skill: 'trot_under_saddle', minLevel: 30 },
      { skill: 'canter_under_saddle', minLevel: 30 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'balance', weight: 0.4 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.07 },
      { stat: 'agility', amount: 0.05 },
      { stat: 'stamina', amount: 0.03 }
    ],
    isPhysical: true,
  },

  // ========== ADVANCED SKILLS ==========
  jumping: {
    id: 'jumping',
    name: 'Jumping',
    category: 'discipline',
    description: 'Teaching the horse to jump obstacles',
    baseTrainingValue: 8,
    prerequisites: [
      { skill: 'trot_under_saddle', minLevel: 70 },
      { skill: 'cavaletti', minLevel: 60 },
    ],
    minimumStats: [
      { stat: 'strength', minLevel: 30 },
      { stat: 'balance', minLevel: 30 },
      { stat: 'agility', minLevel: 25 },
      { stat: 'bravery', minLevel: 20 },
    ],
    statInfluences: [
      { stat: 'bravery', weight: 0.3 },
      { stat: 'strength', weight: 0.3 },
      { stat: 'agility', weight: 0.2 },
      { stat: 'balance', weight: 0.2 },
    ],
    statContributions: [
      { stat: 'strength', amount: 0.05 },
      { stat: 'agility', amount: 0.04 },
      { stat: 'balance', amount: 0.04 },
      { stat: 'bravery', amount: 0.02 },
      { stat: 'stamina', amount: 0.02 },
    ],
    isPhysical: true,
  },

  collection: {
    id: 'collection',
    name: 'Collected Gaits',
    category: 'advanced',
    description: 'Teach the horse to collect itself while moving.',
    baseTrainingValue: 8,
    prerequisites: [
      { skill: 'self_carriage', minLevel: 70 },
      { skill: 'transitions', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'balance', weight: 0.3 },
      { stat: 'strength', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.09 },
      { stat: 'strength', amount: 0.08 },
      { stat: 'flexibility', amount: 0.06 }
    ],
    isPhysical: true,
  },

  extension: {
    id: 'extension',
    name: 'Extended Gaits',
    category: 'advanced',
    description: 'Teach the horse to extend itself while moving.',
    baseTrainingValue: 8,
    prerequisites: [
      { skill: 'self_carriage', minLevel: 70 },
      { skill: 'transitions', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'strength', weight: 0.3 },
      { stat: 'stamina', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'strength', amount: 0.09 },
      { stat: 'stamina', amount: 0.08 },
      { stat: 'movement', amount: 0.06 }
    ],
    isPhysical: true,
  },

  slow_spin: {
    id: 'slow_spin',
    name: 'Turn on the Haunches',
    category: 'advanced',
    description: 'Teach the horse to turn while keeping a rear hoof planted.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'yield_haunches', minLevel: 70 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'balance', weight: 0.3 },
      { stat: 'flexibility', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.08 },
      { stat: 'balance', amount: 0.07 },
      { stat: 'flexibility', amount: 0.05 }
    ],
    isPhysical: true,
  },

  turn_on_forehand: {
    id: 'turn_on_forehand',
    name: 'Turn on the Forehand',
    category: 'advanced',
    description: 'Teach the horse to turn while keeping a front hoof planted.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'yield_forehand', minLevel: 70 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'flexibility', weight: 0.3 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.08 },
      { stat: 'flexibility', amount: 0.06 },
      { stat: 'balance', amount: 0.05 }
    ],
    isPhysical: true,
  },

  halfpass: {
    id: 'halfpass',
    name: 'Halfpass',
    category: 'advanced',
    description: 'Teach the horse to move laterally while maintaining forward momentum.',
    baseTrainingValue: 9,
    prerequisites: [
      { skill: 'sidepass', minLevel: 70 },
      { skill: 'self_carriage', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.3 },
      { stat: 'flexibility', weight: 0.3 },
      { stat: 'balance', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.09 },
      { stat: 'flexibility', amount: 0.07 },
      { stat: 'balance', amount: 0.06 }
    ],
    isPhysical: true,
  },

  pole_sidepass: {
    id: 'pole_sidepass',
    name: 'Sidepass Over Poles',
    category: 'advanced',
    description: 'Teach the horse to move laterally while straddling a pole.',
    baseTrainingValue: 8,
    prerequisites: [
      { skill: 'sidepass', minLevel: 70 },
      { skill: 'ground_poles_walk', minLevel: 60 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'agility', weight: 0.4 },
      { stat: 'flexibility', weight: 0.2 },
      { stat: 'bravery', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'agility', amount: 0.09 },
      { stat: 'flexibility', amount: 0.06 },
      { stat: 'balance', amount: 0.05 }
    ],
    isPhysical: true,
  },

  lead_changes_simple: {
    id: 'lead_changes_simple',
    name: 'Simple Lead Changes',
    category: 'advanced',
    description: 'Teach the horse to change canter leads by transitioning through trot.',
    baseTrainingValue: 6,
    prerequisites: [
      { skill: 'canter_under_saddle', minLevel: 80 },
      { skill: 'trot_under_saddle', minLevel: 80 },
      { skill: 'transitions', minLevel: 70 }
    ],
    minimumStats: [],
    statInfluences: [
      { stat: 'balance', weight: 0.4 },
      { stat: 'agility', weight: 0.2 },
      { stat: 'intelligence', weight: 0.2 }
    ],
    statContributions: [
      { stat: 'balance', amount: 0.08 },
      { stat: 'agility', amount: 0.06 },
      { stat: 'flexibility', amount: 0.05 }
    ],
    isPhysical: true,
  },
};

/**
 * Get all skill IDs
 */
export function getAllSkillIds(): string[] {
  return Object.keys(SKILLS);
}

/**
 * Get skill definition by ID
 */
export function getSkill(skillId: string): SkillDefinition | undefined {
  return SKILLS[skillId];
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): SkillDefinition[] {
  return Object.values(SKILLS).filter(skill => skill.category === category);
}

/**
 * Get foundation skills (no prerequisites)
 */
export function getFoundationSkills(): SkillDefinition[] {
  return Object.values(SKILLS).filter(skill => skill.prerequisites.length === 0);
}

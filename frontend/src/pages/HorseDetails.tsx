import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { horseService } from '../services/api';
import { Horse, TrainingResult } from '../types';
import { calculatePotential, getStarRating } from '@shared/types/genetics.types';
import { SKILLS } from '@shared/skills/skill-definitions';
import { validateSkillTraining } from '@shared/skills/skill-validation';
import { useAuth } from '../contexts/AuthContext';
import { calculateColor, getColorName, formatGeneticCode } from '@shared/visual-genetics/color-calculator';
import HorseImage from '../components/HorseImage';
import type { VisualGenetics } from '@shared/index';

const HorseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [horse, setHorse] = useState<Horse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTrainModal, setShowTrainModal] = useState(false);
  const [trainingType, setTrainingType] = useState<'care' | 'skills'>('skills');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [lastTrainingResult, setLastTrainingResult] = useState<TrainingResult | null>(null);

  useEffect(() => {
    loadHorse();
  }, [id]);

  const loadHorse = async () => {
    if (!id) return;
    try {
      const data = await horseService.getOne(id);
      setHorse(data);
    } catch (error) {
      console.error('Failed to load horse:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!horse) {
    return <div className="min-h-screen flex items-center justify-center">Horse not found</div>;
  }

  const renderStatBar = (statName: string, value: number) => {
    const percentage = value * 100;
    return (
      <div key={statName} className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="capitalize">{statName}</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const getStatPotential = (statName: string) => {
    const potential = calculatePotential(horse.genes[statName]);
    const stars = getStarRating(potential);
    return { potential: potential.toFixed(1), stars: '⭐'.repeat(stars) };
  };

  const colorInfo = calculateColor(horse.visualGenetics as VisualGenetics);

  return (
    <div className="main-container">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-green-600 hover:text-green-700">
              ← Back to Stables
            </Link>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Day {user?.currentDay}</span>
                <span className="mx-2">•</span>
                <span>{user?.timeRemainingToday} min left</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-green-600">${user?.money}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Horse Header */}
      <div className="card mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT SIDE: Horse info */}
          <div>
          <div className='flex justify-between items-start mb-4'>
            <div>
              <h1 className='text-3xl font-bold'>{horse.name}</h1>
              <p className='text-gray-600'>
                {horse.gender.charAt(0).toUpperCase()+horse.gender.slice(1)} • {horse.age} years old • Generation {horse.generation}
              </p>
            </div>
            <button onClick={() => setShowRenameModal(true)} className='btn-secondary text-sm'>
              Rename
            </button>
          </div>
          <div className='space-y-3 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600 font-medium'>Color:</span>
              <span className='font-semibold'>{getColorName(colorInfo.displayColor)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 font-medium'>Personality:</span>
              <span>{horse.mentalState.personality}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 font-medium'>Mood:</span>
              <span>{horse.mentalState.mood}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 font-medium'>Fatigue:</span>
              <span>{horse.mentalState.fatigue}%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 font-medium'>Stabling:</span>
              <span className='capitalize'>{horse.housing}</span>
            </div>
          </div>
          </div>
          
          {/* RIGHT SIDE: Horse image */}
          <div>
            <HorseImage
              visualGenetics={horse.visualGenetics as VisualGenetics}
              width={500}
              height={382}
              className="w-full"
              alt={`${horse.name} - ${getColorName(colorInfo.displayColor)}`}
            />
          </div>
        </div>
      </div>

        {/* Old Horse Header
        <div className="card mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{horse.name}</h1>
              <p className="text-gray-600">
                {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)} • {horse.age} years old • Generation {horse.generation}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowRenameModal(true)} className="btn-secondary text-sm">
                Rename
              </button>
              <span className="text-5xl">
                {horse.gender === 'stallion' ? '🐎' : horse.gender === 'mare' ? '🐴' : '🐴'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Color:</span>
              <span className="font-medium ml-2">
                {getColorName(calculateColor(horse.visualGenetics as VisualGenetics).displayColor)}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Personality:</span>
              <span className="font-medium ml-2">{horse.mentalState.personality}</span>
            </div>
            <div>
              <span className="text-gray-600">Mood:</span>
              <span className="font-medium ml-2">{horse.mentalState.mood}</span>
            </div>
            <div>
              <span className="text-gray-600">Fatigue:</span>
              <span className="font-medium ml-2">{horse.mentalState.fatigue}%</span>
            </div>
            <div>
              <span className="text-gray-600">Housing:</span>
              <span className="font-medium ml-2">{horse.housing}</span>
            </div>
          </div>
        </div>*/}

        {/* Last Training Result */}
        {lastTrainingResult && (
          <div className={`card mb-8 ${lastTrainingResult.success ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
            <h3 className="font-bold mb-2">Training Result</h3>
            <p className="text-gray-700 mb-2">{lastTrainingResult.message}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Skill Gained:</span>
                <span className="font-medium ml-2">+{lastTrainingResult.skillGained.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-gray-600">New Level:</span>
                <span className="font-medium ml-2">{lastTrainingResult.newSkillLevel.toFixed(1)}</span>
              </div>
              <div>
                <span className="text-gray-600">Fatigue:</span>
                <span className="font-medium ml-2">+{lastTrainingResult.fatigueGained}</span>
              </div>
              <div>
                <span className="text-gray-600">Time Left:</span>
                <span className="font-medium ml-2">{lastTrainingResult.timeRemaining} min</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats & Training */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Training Progress</h2>
            <div className="space-y-3">
              {Object.entries(horse.training).map(([statName, value]) => {
                const { potential, stars } = getStatPotential(statName);
                return (
                  <div key={statName}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm capitalize">{statName}</span>
                      <span className="text-xs text-gray-500" title={`Potential: ${potential}`}>
                        {stars}
                      </span>
                    </div>
                    {renderStatBar('', value)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horse Care */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Grooming</h2>
              <button
                onClick={() => {
                  setTrainingType('care');
                  setShowTrainModal(true);
                }}
                className="btn-primary text-sm"
                disabled={horse.mentalState.mood === 'Shut-down' || user?.timeRemainingToday === 0}
                >Groom Horse</button>
            </div>

            {Object.entries(horse.skills).filter(([skillId]) => {
              const skill = SKILLS[skillId];
              return skill?.category === 'care';
            }).length === 0 ? (
              <p className="text-gray-600 text-center py-8">No grooming experience yet.</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(horse.skills).filter(([skillId]) => {
                  const skill = SKILLS[skillId];
                  return skill?.category === 'care';
                }).map(([skillId, level]) => (
                  <div key={skillId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{SKILLS[skillId]?.name || skillId}</span>
                      <span>{level.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Skill Training */}
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Skills</h2>
              <button
                onClick={() => {
                  setTrainingType('skills');
                  setShowTrainModal(true);
                }}
                className="btn-primary text-sm"
                disabled={horse.mentalState.mood === 'Shut-down' || user?.timeRemainingToday === 0}
              >
                Train Horse
              </button>
            </div>

            {Object.entries(horse.skills).filter(([skillId]) => {
              const skill = SKILLS[skillId];
              return skill?.category !== 'care';
            }).length === 0 ? (
              <p className="text-gray-600 text-center py-8">No skills learned yet. Start training!</p>
            ) : (
              <div className="space-y-3">
                {Object.entries(horse.skills)
                .filter(([skillId]) => {
                  const skill = SKILLS[skillId];
                  return skill?.category !== 'care';
                })
                .map(([skillId, level]) => (
                  <div key={skillId} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{SKILLS[skillId]?.name || skillId}</span>
                      <span>{level.toFixed(1)}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>  
      </main>

      {/* Rename Modal */}
      {showRenameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Rename {horse.name}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try{
                await horseService.rename(horse.id, newName);
                loadHorse();
                setShowRenameModal(false);
                setNewName('');
              } catch (error) {
                console.error('Failed to rename horse:', error);
              }
            }} className="space-y-4">
              <div>
                <label className="label">New Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="input"
                  placeholder={horse.name}
                  required
                />
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary flex-1">
                  Rename
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowRenameModal(false);
                    setNewName('');
                  }}
                  className="btn-secondary flex-1">
                    Cancel
                  </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Training Modal */}
      {showTrainModal && (
        <TrainModal
          horse={horse}
          trainingType={trainingType}
          onClose={() => setShowTrainModal(false)}
          onSuccess={(result) => {
            setLastTrainingResult(result);
            setShowTrainModal(false);
            loadHorse();
            refreshUser();
          }}
        />
      )}
    </div>
  );
};

// Training Modal Component
const TrainModal: React.FC<{
  horse: Horse;
  trainingType: 'care' | 'skills';
  onClose: () => void;
  onSuccess: (result: TrainingResult) => void;
}> = ({ horse, trainingType, onClose, onSuccess }) => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [duration, setDuration] = useState<5 | 15 | 30 | 60>(15);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get available skills
  const availableSkills = Object.values(SKILLS).filter((skill) => {
    // Filter by category based on which button was clicked
    if (trainingType === 'care' && skill.category !== 'care') {
      return false;
    }
    if (trainingType === 'skills' && skill.category === 'care'){
      return false;
    }

    const validation = validateSkillTraining(horse as any, skill.id);
    return validation.canTrain;
  })
  //const availableSkills = Object.values(SKILLS).filter((skill) => {
  //  const validation = validateSkillTraining(horse as any, skill.id);
  //  return validation.canTrain;
  //});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await horseService.train(horse.id, selectedSkill, duration);
      onSuccess(result);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Training failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Train {horse.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Skill</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="input"
              required
            >
              <option value="">Select a skill...</option>
              {availableSkills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.name} (Difficulty: {skill.baseTrainingValue}/10)
                </option>
              ))}
            </select>
            {selectedSkill && SKILLS[selectedSkill] && (
              <p className="text-sm text-gray-600 mt-1">
                {SKILLS[selectedSkill].description}
              </p>
            )}
          </div>

          <div>
            <label className="label">Duration</label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 15, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d as any)}
                  className={`px-4 py-2 rounded-lg border ${
                    duration === d
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-600'
                  }`}
                >
                  {d} min
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button type="submit" disabled={loading || !selectedSkill} className="btn-primary flex-1">
              {loading ? 'Training...' : 'Start Training'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HorseDetails;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { horseService, breedingService } from '../services/api';
import { Horse } from '../types';
import { calculatePotential, getStarRating } from '@shared/types/genetics.types';
import { calculateColor, getColorName } from '@shared/visual-genetics/color-calculator';
import type { VisualGenetics } from '@shared/types/visual-genetics.types';

const Breeding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [sireId, setSireId] = useState('');
  const [damId, setDamId] = useState('');
  const [foalName, setFoalName] = useState('');
  const [breeding, setBreeding] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadHorses();
  }, []);

  const loadHorses = async () => {
    try {
      const data = await horseService.getAll();
      setHorses(data);
    } catch (error) {
      console.error('Failed to load horses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter horses for breeding
  const stallions = horses.filter(h => h.gender === 'stallion' && h.age >= 3);
  const mares = horses.filter(h => h.gender === 'mare' && h.age >= 3);

  const selectedSire = horses.find(h => h.id === sireId);
  const selectedDam = horses.find(h => h.id === damId);

  const handleBreed = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sireId || !damId || !foalName) {
      setError('Please select both parents and enter a name for the foal');
      return;
    }

    if (sireId === damId) {
      setError('Cannot breed a horse with itself');
      return;
    }

    if (user && user.money < 5000) {
      setError('Not enough money. Breeding costs $5,000');
      return;
    }

    setBreeding(true);

    try {
      const foal = await breedingService.breed(sireId, damId, foalName);
      alert(`${foalName} was born! A ${foal.gender} with ${foal.mentalState.personality} personality.`);
      navigate(`/horse/${foal.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Breeding failed');
    } finally {
      setBreeding(false);
    }
  };

  const getAveragePotential = (horse: Horse) => {
    let total = 0;
    let count = 0;
    Object.keys(horse.genes).forEach(stat => {
      total += calculatePotential(horse.genes[stat]);
      count++;
    });
    return (total / count).toFixed(1);
  };

  const getStatComparison = (stat: string) => {
    if (!selectedSire || !selectedDam) return null;
    
    const sirePotential = calculatePotential(selectedSire.genes[stat]);
    const damPotential = calculatePotential(selectedDam.genes[stat]);
    const avgPotential = (sirePotential + damPotential) / 2;
    
    return {
      sire: sirePotential.toFixed(1),
      dam: damPotential.toFixed(1),
      expected: avgPotential.toFixed(1),
      stars: getStarRating(avgPotential)
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <span className="font-medium text-green-600">${user?.money}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🐴 Breeding</h1>
          <p className="text-gray-600 mt-2">
            Select a stallion and mare to breed. Cost: <span className="font-bold text-green-600">$5,000</span>
          </p>
        </div>

        {/* Availability Check */}
        {stallions.length === 0 || mares.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">
              {stallions.length === 0 && mares.length === 0
                ? 'You need at least one stallion and one mare that are 3+ years old to breed.'
                : stallions.length === 0
                ? 'You need a stallion that is 3+ years old to breed.'
                : 'You need a mare that is 3+ years old to breed.'}
            </p>
            <Link to="/" className="btn-primary">
              Back to Stables
            </Link>
          </div>
        ) : (
          <form onSubmit={handleBreed}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Stallion Selection */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Select Stallion (Sire)</h2>
                <div className="space-y-3">
                  {stallions.map((horse) => (
                    <label
                      key={horse.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        sireId === horse.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="sire"
                        value={horse.id}
                        checked={sireId === horse.id}
                        onChange={(e) => setSireId(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-lg">{horse.name}</div>
                          <div className='text-sm text-gray-600'>
                            {getColorName(calculateColor(horse.visualGenetics as VisualGenetics).displayColor)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {horse.age} years • {horse.mentalState.personality}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Avg Potential: {getAveragePotential(horse)} {'⭐'.repeat(getStarRating(parseFloat(getAveragePotential(horse))))}
                          </div>
                        </div>
                        <span className="text-3xl">🐎</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mare Selection */}
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Select Mare (Dam)</h2>
                <div className="space-y-3">
                  {mares.map((horse) => (
                    <label
                      key={horse.id}
                      className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        damId === horse.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="dam"
                        value={horse.id}
                        checked={damId === horse.id}
                        onChange={(e) => setDamId(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-lg">{horse.name}</div>
                          <div className='text-sm text-gray-600'>
                            {getColorName(calculateColor(horse.visualGenetics as VisualGenetics).displayColor)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {horse.age} years • {horse.mentalState.personality}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Avg Potential: {getAveragePotential(horse)} {'⭐'.repeat(getStarRating(parseFloat(getAveragePotential(horse))))}
                          </div>
                        </div>
                        <span className="text-3xl">🐴</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Foal Name */}
            <div className="card mb-8">
              <label className="label">Foal Name</label>
              <input
                type="text"
                value={foalName}
                onChange={(e) => setFoalName(e.target.value)}
                className="input"
                placeholder="Enter a name for the foal..."
                required
              />
            </div>

            {/* Expected Genetics Preview */}
            {selectedSire && selectedDam && (
              <div className="card mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Expected Foal Genetics</h2>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    {showPreview ? 'Hide' : 'Show'} Details
                  </button>
                </div>

                {showPreview && (
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-4 gap-4 font-medium text-gray-600 pb-2 border-b">
                      <div>Stat</div>
                      <div>Sire</div>
                      <div>Dam</div>
                      <div>Expected Avg</div>
                    </div>
                    {Object.keys(selectedSire.genes).map((stat) => {
                      const comparison = getStatComparison(stat);
                      if (!comparison) return null;
                      return (
                        <div key={stat} className="grid grid-cols-4 gap-4 py-1">
                          <div className="capitalize font-medium">{stat}</div>
                          <div>{comparison.sire}</div>
                          <div>{comparison.dam}</div>
                          <div>
                            {comparison.expected} {'⭐'.repeat(comparison.stars)}
                          </div>
                        </div>
                      );
                    })}
                    <div className="pt-4 mt-4 border-t text-gray-600">
                      <p className="text-xs">
                        * Actual foal genetics will vary due to random allele selection and possible mutations (±5 points).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
                {error}
              </div>
            )}

            {/* Breed Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={breeding || !sireId || !damId || !foalName}
                className="btn-primary flex-1 text-lg py-3"
              >
                {breeding ? 'Breeding...' : 'Breed Horses ($5,000)'}
              </button>
              <Link to="/" className="btn-secondary flex-1 text-lg py-3 text-center">
                Cancel
              </Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default Breeding;

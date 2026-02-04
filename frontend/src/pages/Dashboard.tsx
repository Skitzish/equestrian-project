import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { horseService, gameService } from '../services/api';
import { Horse } from '../types';
import { calculatePotential, getStarRating } from '@shared/types/genetics.types';
import { calculateColor, getColorName } from '@shared/visual-genetics/color-calculator';
import type { VisualGenetics } from '@shared/types/visual-genetics.types';

const Dashboard: React.FC = () => {
  const { user, refreshUser, logout } = useAuth();
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const handleAdvanceDay = async () => {
    if (!confirm('Advance to the next day? All horses will have their moods and fatigue updated.')) {
      return;
    }

    try {
      await gameService.advanceDay();
      await refreshUser();
      await loadHorses();
      alert('Day advanced successfully!');
    } catch (error) {
      console.error('Failed to advance day:', error);
      alert('Failed to advance day');
    }
  };

  const getStars = (genes: any, stat: string): string => {
    const potential = calculatePotential(genes[stat]);
    const stars = getStarRating(potential);
    return '⭐'.repeat(stars);
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
            <h1 className="text-2xl font-bold text-gray-900">🐴 Equestrian Legacy</h1>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Day {user?.currentDay}</span>
                <span className="mx-2">•</span>
                <span>{user?.timeRemainingToday} min left</span>
                <span className="mx-2">•</span>
                <span className="font-medium text-green-600">${user?.money}</span>
              </div>
              <button onClick={logout} className="btn-secondary text-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Actions */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setShowCreateModal(true)} className="btn-primary">
            + Create Horse
          </button>
          <Link to="/breeding" className="btn-secondary">
            🐴 Breed Horses
          </Link>
          <Link to="/chores" className="btn-secondary">
            🧺 Barn Chores
          </Link>
          <button onClick={handleAdvanceDay} className="btn-secondary">
            Advance Day →
          </button>
        </div>

        {/* Horse List */}
        {horses.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 mb-4">You don't have any horses yet.</p>
            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              Create Your First Horse
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {horses.map((horse) => (
              <Link
                key={horse.id}
                to={`/horse/${horse.id}`}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{horse.name}</h3>
                    <p className="text-sm text-gray-600">
                      {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)} • {horse.age} years
                    </p>
                  </div>
                  <span className="text-2xl">
                    {horse.gender === 'stallion' ? '🐎' : horse.gender === 'mare' ? '🐴' : '🐴'}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">
                        {getColorName(calculateColor(horse.visualGenetics as VisualGenetics).displayColor)}
                     </span>
                    </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personality:</span>
                    <span className="font-medium">{horse.mentalState.personality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mood:</span>
                    <span className="font-medium">{horse.mentalState.mood}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fatigue:</span>
                    <span className="font-medium">{horse.mentalState.fatigue}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Stat:</span>
                    <span className="font-medium">
                      {getStars(horse.genes, 'strength')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      {/* Create Horse Modal */}
      {showCreateModal && (
        <CreateHorseModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            loadHorses();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
};

// Create Horse Modal Component
const CreateHorseModal: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'stallion' | 'mare' | 'gelding'>('stallion');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await horseService.create(name, gender);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create horse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="card max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Create New Horse</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              required
            />
          </div>

          <div>
            <label className="label">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              className="input"
            >
              <option value="stallion">Stallion</option>
              <option value="mare">Mare</option>
              <option value="gelding">Gelding</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Creating...' : 'Create Horse'}
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

export default Dashboard;

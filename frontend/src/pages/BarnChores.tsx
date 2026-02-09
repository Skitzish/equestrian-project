import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { gameService } from '../services/api';
import { useAdvanceDay } from '@/hooks/useAdvanceDay';
import { getMainNavigationButtons, getSecondaryNavButtons } from '@/config/buttonPresets';
import Header from '@/components/Header';
import ButtonBar from '@/components/ButtonBar';

interface Chore {
  id: string;
  name: string;
  duration: number;
  payment: number;
  icon: string;
}

const chores: Chore[] = [
  { id: 'muck_stalls', name: 'Muck Stalls', duration: 60, payment: 32, icon: '🧹' },
  { id: 'water_horses', name: 'Water Horses', duration: 15, payment: 8, icon: '💧' },
  { id: 'fill_hay_nets', name: 'Fill Hay Nets', duration: 30, payment: 16, icon: '🌾' },
];

const BarnChores: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [working, setWorking] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDoChore = async (choreId: string) => {
    setWorking(true);
    setResult(null);

    try {
      const res = await gameService.doChore(choreId);
      setResult(res);
      await refreshUser();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to complete chore');
    } finally {
      setWorking(false);
    }
  };

  const handleAdvanceDay = useAdvanceDay;

  const buttons = [
        ...getSecondaryNavButtons,
        ...getMainNavigationButtons(handleAdvanceDay)
        
    ]

  return (
    <div className="main-container">
      {/* Header */}
      <header>
        <Header />
        <ButtonBar buttons={buttons} />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🧺 Barn Chores</h1>
          <p className="text-gray-600 mt-2">
            Complete chores to earn extra money. Each chore takes time from your daily schedule.
          </p>
        </div>

        {/* Result Display */}
        {result && (
          <div className="card mb-8 border-l-4 border-green-500">
            <h3 className="font-bold text-lg mb-2">Chore Complete!</h3>
            <p className="text-gray-700 mb-2">
              You completed <span className="font-medium">{result.choreName}</span>
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Time Spent:</span>
                <span className="font-medium ml-2">{result.timeSpent} min</span>
              </div>
              <div>
                <span className="text-gray-600">Earned:</span>
                <span className="font-medium text-green-600 ml-2">+${result.moneyEarned}</span>
              </div>
              <div>
                <span className="text-gray-600">Time Left:</span>
                <span className="font-medium ml-2">{result.timeRemaining} min</span>
              </div>
            </div>
          </div>
        )}

        {/* Chores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chores.map((chore) => (
            <div key={chore.id} className="card hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">
                <div className="text-5xl mb-2">{chore.icon}</div>
                <h3 className="text-xl font-bold">{chore.name}</h3>
              </div>

              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{chore.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium text-green-600">${chore.payment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium text-gray-500">
                    ${(chore.payment / chore.duration * 60).toFixed(2)}/hour
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDoChore(chore.id)}
                disabled={working || (user?.timeRemainingToday || 0) < chore.duration}
                className="btn-primary w-full"
              >
                {working ? 'Working...' : 'Do Chore'}
              </button>
            </div>
          ))}
        </div>

        {user && user.timeRemainingToday === 0 && (
          <div className="card text-center mt-8 bg-yellow-50 border border-yellow-200">
            <p className="text-gray-700">
              You're out of time for today! Return to the dashboard and advance the day to continue.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default BarnChores;

import React from 'react';
import { useGame } from '@/contexts/GameContext';
import CurrentWord from './CurrentWord';
import PlayerList from './PlayerList';
import GameInfo from './GameInfo';
import GameLobby from './GameLobby';
import Leaderboard from './Leaderboard';

const GameInterface: React.FC = () => {
  const { gameSession, displayMode, gamePhase } = useGame();
  
  if (!gameSession) {
    return null;
  }

  const containerClasses = displayMode === 'overlay' 
    ? 'fixed bottom-4 right-4 w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden z-50 animate-slide-in-right'
    : 'w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in';
  
  return (
    <div className={containerClasses}>
      <GameInfo />
      {gamePhase === 'lobby' && <GameLobby />}
      {gamePhase === 'playing' && (
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <CurrentWord />
          <PlayerList />
        </div>
      )}
      {gamePhase === 'leaderboard' && <Leaderboard />}
    </div>
  );
};

export default GameInterface;

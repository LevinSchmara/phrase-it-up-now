import React from 'react';
import { useGame } from '@/contexts/GameContext';
import CurrentWord from './CurrentWord';
import PlayerList from './PlayerList';
import GameInfo from './GameInfo';
import GameLobby from './GameLobby';
import Leaderboard from './Leaderboard';
import NewGameScreen from './NewGameScreen';

const GameInterface: React.FC = () => {
  const { gameSession, displayMode, gamePhase } = useGame();
  
  if (!gameSession) {
    return null;
  }

  const containerClasses = gamePhase === 'playing' 
    ? 'fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in overflow-hidden' 
    : gamePhase === 'lobby' || displayMode === 'window'
      ? 'w-full max-w-md mx-auto bg-black/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 overflow-hidden animate-fade-in'
      : 'fixed bottom-4 right-4 w-80 bg-black/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700 overflow-hidden z-50 animate-slide-in-right';
  
  return (
    <div className={containerClasses}>
      {gamePhase !== 'playing' && <GameInfo />}
      {gamePhase === 'lobby' && <GameLobby />}
      {gamePhase === 'playing' && (
        <div className="w-full h-full flex flex-col">
          <GameInfo className="shrink-0" />
          <NewGameScreen />
        </div>
      )}
      {gamePhase === 'leaderboard' && <Leaderboard />}
    </div>
  );
};

export default GameInterface;

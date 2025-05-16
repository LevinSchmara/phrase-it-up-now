
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PlayerList: React.FC = () => {
  const { gameSession, currentPlayer, detectWord } = useGame();

  if (!gameSession || !gameSession.players.length) {
    return <div className="p-4 text-center">No players in the game yet</div>;
  }

  // Sort players by score
  const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);

  const handleDetectWord = (playerId: string) => {
    detectWord(playerId);
  };

  return (
    <div className="player-list p-4 animate-fade-in">
      <h2 className="text-lg font-bold mb-4">Players & Scoreboard</h2>
      
      <div className="space-y-3">
        {sortedPlayers.map((player, index) => {
          const isCurrentPlayer = player.id === currentPlayer?.id;
          const hasDetectedThis = currentPlayer ? player.hasDetected.includes(currentPlayer.id) : false;
          
          return (
            <div 
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                index === 0 ? 'bg-game-yellow/20 dark:bg-game-yellow/10' : 'bg-white/50 dark:bg-game-dark/50'
              } ${isCurrentPlayer ? 'border-2 border-game-blue' : 'border border-gray-100 dark:border-gray-800'}`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  index === 0 ? 'bg-game-yellow text-black' : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">
                    {player.name} {isCurrentPlayer && <span className="text-xs">(you)</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {player.difficulty} • {player.currentWord ? 'Has word' : 'No word'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold mr-2">
                  {player.score}
                </div>
                
                {!isCurrentPlayer && player.currentWord && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`rounded-full w-8 h-8 p-0 ${
                      hasDetectedThis ? 'bg-green-100 text-green-600 cursor-default' : 'hover:bg-muted'
                    }`}
                    onClick={() => !hasDetectedThis && handleDetectWord(player.id)}
                    disabled={hasDetectedThis}
                  >
                    <Check size={16} />
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;

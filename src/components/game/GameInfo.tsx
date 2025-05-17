
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Layers } from 'lucide-react';

const GameInfo: React.FC = () => {
  const { 
    gameSession, 
    leaveGame, 
    toggleDisplayMode, 
    displayMode,
    gamePhase,
    showLeaderboard,
    returnToLobby
  } = useGame();
  
  if (!gameSession) {
    return null;
  }

  const getElapsedTime = () => {
    const msElapsed = Date.now() - gameSession.startTime;
    const minutes = Math.floor(msElapsed / 60000);
    const seconds = Math.floor((msElapsed % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="mb-4 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>
            {gameSession.name}
          </CardTitle>
          <Badge variant="outline">
            {gameSession.players.length} {gameSession.players.length === 1 ? 'player' : 'players'}
          </Badge>
        </div>
        <CardDescription>
          Game time: {getElapsedTime()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm">
          Game ID: <span className="font-mono text-xs bg-muted p-1 rounded">{gameSession.id}</span>
        </p>
        {gamePhase === 'lobby' && (
          <p className="text-xs text-muted-foreground mt-2">
            Waiting for players to join the game...
          </p>
        )}
        {gamePhase === 'playing' && (
          <p className="text-xs text-muted-foreground mt-2">
            Listen carefully and click when you hear someone's word!
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {gamePhase === 'playing' ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={showLeaderboard}
              className="flex items-center gap-1"
            >
              <Award size={16} />
              Leaderboard
            </Button>
          </>
        ) : gamePhase === 'leaderboard' ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={returnToLobby}
            >
              Back to Lobby
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={leaveGame}
            >
              Leave Game
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={leaveGame}
            >
              Leave Game
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default GameInfo;

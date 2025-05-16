
import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GameInfo: React.FC = () => {
  const { gameSession, leaveGame, toggleDisplayMode, displayMode } = useGame();
  
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
        <p className="text-xs text-muted-foreground mt-2">
          Share this code with others so they can join your game!
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={toggleDisplayMode}
        >
          {displayMode === 'overlay' ? 'Switch to Window' : 'Switch to Overlay'}
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={leaveGame}
        >
          Leave Game
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameInfo;

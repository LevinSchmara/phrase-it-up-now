
import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GameLobby: React.FC = () => {
  const { gameSession, startGame } = useGame();
  const [wordsPerCategory, setWordsPerCategory] = useState({
    easy: 1,
    medium: 1,
    hard: 1
  });

  if (!gameSession) {
    return null;
  }

  const handleStartGame = () => {
    startGame();
  };

  const handleWordCountChange = (category: 'easy' | 'medium' | 'hard', value: number) => {
    if (value >= 0 && value <= 5) {
      setWordsPerCategory(prev => ({
        ...prev,
        [category]: value
      }));
    }
  };

  return (
    <div className="p-4 animate-fade-in">
      <h2 className="text-xl font-bold mb-4 text-center">Game Lobby</h2>
      
      <Card className="mb-4">
        <CardContent className="pt-4">
          <h3 className="font-semibold mb-2">Players Joined ({gameSession.players.length})</h3>
          <div className="space-y-2">
            {gameSession.players.map((player) => (
              <div key={player.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                <span>{player.name}</span>
                <span className="text-xs text-muted-foreground">{player.difficulty}</span>
              </div>
            ))}
          </div>
          {gameSession.players.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">
              Waiting for players to join...
            </p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="game-settings">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="game-settings">Game Settings</TabsTrigger>
          <TabsTrigger value="share-info">Share Game</TabsTrigger>
        </TabsList>
        <TabsContent value="game-settings" className="space-y-4 py-2">
          <div className="space-y-3">
            <div>
              <Label>Words per Category</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <div className="space-y-1">
                  <Label className="text-xs">Easy</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('easy', wordsPerCategory.easy - 1)}
                      disabled={wordsPerCategory.easy <= 0}
                    >-</Button>
                    <Input 
                      className="h-8 w-12 mx-1 text-center" 
                      value={wordsPerCategory.easy}
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('easy', wordsPerCategory.easy + 1)}
                      disabled={wordsPerCategory.easy >= 5}
                    >+</Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Medium</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('medium', wordsPerCategory.medium - 1)}
                      disabled={wordsPerCategory.medium <= 0}
                    >-</Button>
                    <Input 
                      className="h-8 w-12 mx-1 text-center" 
                      value={wordsPerCategory.medium}
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('medium', wordsPerCategory.medium + 1)}
                      disabled={wordsPerCategory.medium >= 5}
                    >+</Button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label className="text-xs">Hard</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('hard', wordsPerCategory.hard - 1)}
                      disabled={wordsPerCategory.hard <= 0}
                    >-</Button>
                    <Input 
                      className="h-8 w-12 mx-1 text-center" 
                      value={wordsPerCategory.hard}
                      readOnly
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleWordCountChange('hard', wordsPerCategory.hard + 1)}
                      disabled={wordsPerCategory.hard >= 5}
                    >+</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="share-info" className="py-2">
          <p className="text-sm mb-2">Share this code with friends to join:</p>
          <div className="flex items-center gap-2">
            <Input 
              value={gameSession.id} 
              readOnly 
              className="font-mono bg-muted"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(gameSession.id);
              }}
            >
              Copy
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-6">
        <Button 
          className="w-full"
          onClick={handleStartGame}
          disabled={gameSession.players.length === 0}
        >
          Start Game
        </Button>
      </div>
    </div>
  );
};

export default GameLobby;

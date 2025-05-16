
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/contexts/GameContext';

const GameSetup: React.FC = () => {
  const { createGame, joinGame } = useGame();
  const [activeTab, setActiveTab] = useState('create');
  const [gameName, setGameName] = useState('');
  const [gameId, setGameId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameName.trim()) {
      createGame(gameName.trim());
    }
  };

  const handleJoinGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameId.trim() && playerName.trim()) {
      joinGame(gameId.trim(), playerName.trim());
    }
  };

  return (
    <Card className="w-[350px] animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold bg-clip-text text-transparent game-gradient">Word Spy</CardTitle>
        <CardDescription className="text-center">The sneaky word game for video calls</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="create">Create Game</TabsTrigger>
            <TabsTrigger value="join">Join Game</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="space-y-4">
            <form onSubmit={handleCreateGame} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="gameName" className="text-sm font-medium">
                  Game Name
                </label>
                <Input 
                  id="gameName" 
                  placeholder="Enter a name for your game" 
                  value={gameName}
                  onChange={(e) => setGameName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                Create New Game
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="join" className="space-y-4">
            <form onSubmit={handleJoinGame} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="gameId" className="text-sm font-medium">
                  Game Code
                </label>
                <Input 
                  id="gameId" 
                  placeholder="Enter game code" 
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="playerName" className="text-sm font-medium">
                  Your Name
                </label>
                <Input 
                  id="playerName" 
                  placeholder="Enter your name" 
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full btn-primary">
                Join Game
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Play with friends during video calls!
        </p>
      </CardFooter>
    </Card>
  );
};

export default GameSetup;

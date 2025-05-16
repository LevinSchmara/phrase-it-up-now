
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Difficulty, GameSession, Player, WordBank } from '@/types/game';
import { useToast } from '@/components/ui/use-toast';

interface GameContextType {
  gameSession: GameSession | null;
  currentPlayer: Player | null;
  displayMode: 'overlay' | 'window';
  words: WordBank;
  createGame: (name: string) => void;
  joinGame: (gameId: string, playerName: string) => void;
  leaveGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  assignWord: () => void;
  detectWord: (playerId: string) => void;
  getPlayerWord: () => string | null;
  toggleDisplayMode: () => void;
}

// Sample word bank for demonstration
const sampleWords: WordBank = {
  easy: [
    'definitely', 'actually', 'basically', 'fantastic', 'awesome',
    'wonderful', 'incredible', 'absolutely', 'exactly', 'precisely',
    'literally', 'honestly', 'seriously', 'totally', 'completely'
  ],
  medium: [
    'serendipity', 'conundrum', 'paradoxical', 'quintessential', 'meticulous',
    'exacerbate', 'paradigm', 'juxtaposition', 'idiosyncratic', 'superfluous',
    'discombobulated', 'perpendicular', 'ambivalent', 'ubiquitous', 'ephemeral'
  ],
  hard: [
    'antidisestablishmentarianism', 'pneumonoultramicroscopicsilicovolcanoconiosis', 'floccinaucinihilipilification',
    'hippopotomonstrosesquippedaliophobia', 'pseudopseudohypoparathyroidism', 'supercalifragilisticexpialidocious',
    'incomprehensibilities', 'honorificabilitudinitatibus', 'thyroparathyroidectomized', 'dichlorodifluoromethane'
  ]
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [displayMode, setDisplayMode] = useState<'overlay' | 'window'>('overlay');
  const [words, setWords] = useState<WordBank>(sampleWords);
  const { toast } = useToast();

  const createGame = (name: string) => {
    const newGame: GameSession = {
      id: `game_${Date.now().toString(36)}`,
      name,
      players: [],
      isActive: true,
      startTime: Date.now(),
      endTime: null
    };

    setGameSession(newGame);
    toast({
      title: "Game Created",
      description: `Game "${name}" has been created successfully!`
    });
  };

  const joinGame = (gameId: string, playerName: string) => {
    if (!gameSession || gameSession.id !== gameId) {
      toast({
        title: "Error",
        description: "Game not found or no longer active.",
        variant: "destructive"
      });
      return;
    }

    const newPlayer: Player = {
      id: `player_${Date.now().toString(36)}`,
      name: playerName,
      score: 0,
      currentWord: null,
      difficulty: 'medium',
      hasDetected: []
    };

    setCurrentPlayer(newPlayer);
    
    // In a real implementation, this would update the server
    setGameSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: [...prev.players, newPlayer]
      };
    });

    toast({
      title: "Joined Game",
      description: `You've joined "${gameSession.name}" as ${playerName}`
    });
  };

  const leaveGame = () => {
    if (!gameSession || !currentPlayer) return;

    // In a real implementation, this would update the server
    setGameSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.filter(p => p.id !== currentPlayer.id)
      };
    });

    setCurrentPlayer(null);
    toast({ description: "You've left the game" });
  };

  const setDifficulty = (difficulty: Difficulty) => {
    if (!currentPlayer) return;

    setCurrentPlayer(prev => {
      if (!prev) return null;
      return { ...prev, difficulty };
    });

    toast({ description: `Difficulty set to ${difficulty}` });
  };

  const getRandomWord = (difficulty: Difficulty): string => {
    const difficultyWords = words[difficulty];
    return difficultyWords[Math.floor(Math.random() * difficultyWords.length)];
  };

  const assignWord = () => {
    if (!currentPlayer) return;

    const newWord = getRandomWord(currentPlayer.difficulty);
    
    setCurrentPlayer(prev => {
      if (!prev) return null;
      return { ...prev, currentWord: newWord };
    });

    toast({
      title: "New Word Assigned",
      description: `Your word is: "${newWord}"`,
      duration: 5000,
    });
  };

  const detectWord = (playerId: string) => {
    if (!gameSession || !currentPlayer) return;

    // In a real implementation, this would validate with the server
    const detectingPlayer = gameSession.players.find(p => p.id === playerId);
    if (!detectingPlayer || !detectingPlayer.currentWord) return;

    // Update the player who was detected
    setGameSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.map(p => {
          if (p.id === playerId) {
            const hasDetected = [...p.hasDetected, currentPlayer.id];
            return {
              ...p,
              score: p.score + 1,
              hasDetected
            };
          }
          return p;
        })
      };
    });

    toast({
      title: "Word Detected!",
      description: `You caught ${detectingPlayer.name} saying "${detectingPlayer.currentWord}"!`,
      variant: "default",
    });
  };

  const getPlayerWord = () => {
    return currentPlayer?.currentWord || null;
  };

  const toggleDisplayMode = () => {
    setDisplayMode(prev => prev === 'overlay' ? 'window' : 'overlay');
    toast({ 
      description: `Display mode changed to ${displayMode === 'overlay' ? 'window' : 'overlay'}`
    });
  };

  return (
    <GameContext.Provider value={{
      gameSession,
      currentPlayer,
      displayMode,
      words,
      createGame,
      joinGame,
      leaveGame,
      setDifficulty,
      assignWord,
      detectWord,
      getPlayerWord,
      toggleDisplayMode
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

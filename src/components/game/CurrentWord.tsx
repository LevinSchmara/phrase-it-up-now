
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Difficulty } from '@/types/game';

const CurrentWord: React.FC = () => {
  const { currentPlayer, assignWord, setDifficulty } = useGame();
  const [isWordVisible, setIsWordVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
  
  const word = currentPlayer?.currentWord;
  const currentDifficulty = currentPlayer?.difficulty || 'medium';

  useEffect(() => {
    // Reset visibility when word changes
    if (word) {
      setIsWordVisible(true);
      setTimeLeft(30);
    }
  }, [word]);

  useEffect(() => {
    if (!isWordVisible || !word) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsWordVisible(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isWordVisible, word]);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setDifficulty(difficulty);
  };

  const difficultyColors = {
    easy: 'bg-game-green text-white',
    medium: 'bg-game-yellow text-black',
    hard: 'bg-game-red text-white'
  };

  return (
    <div className="word-container p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Secret Word</h2>
        <Badge variant="outline" className={difficultyColors[currentDifficulty]}>
          {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}
        </Badge>
      </div>
      
      <div className="word-card animate-pulse-soft group hover:animate-none">
        {word && isWordVisible ? (
          <>
            <div className="text-xl font-bold mb-1">{word}</div>
            <div className="text-xs opacity-80">Try to naturally use this word in conversation</div>
            <div className="absolute top-2 right-2 text-xs bg-black bg-opacity-30 px-2 py-1 rounded-full">
              {timeLeft}s
            </div>
          </>
        ) : (
          <div className="text-lg">
            {word ? "Word hidden. Get a new one!" : "No word assigned yet"}
          </div>
        )}
      </div>
      
      <div className="flex justify-center mb-6">
        <Button 
          onClick={assignWord} 
          className="btn-primary"
        >
          {word ? "Get New Word" : "Get Your First Word"}
        </Button>
      </div>
      
      <div className="difficulty-selector">
        <p className="text-sm text-center mb-2">Difficulty Level:</p>
        <div className="flex justify-center space-x-2">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all ${
                currentDifficulty === diff
                  ? difficultyColors[diff] + ' shadow-md'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWord;

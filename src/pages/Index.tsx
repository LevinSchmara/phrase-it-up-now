
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import GameSetup from '@/components/game/GameSetup';
import GameInterface from '@/components/game/GameInterface';
import OnboardingTutorial from '@/components/game/OnboardingTutorial';
import { useGame } from '@/contexts/GameContext';

const Index = () => {
  const { gameSession } = useGame();
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  // Check if this is the first visit
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    const tutorialSeen = localStorage.getItem('wordspy-tutorial-seen');
    if (!tutorialSeen) {
      setShowTutorial(true);
    } else {
      setHasSeenTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => {
    localStorage.setItem('wordspy-tutorial-seen', 'true');
    setHasSeenTutorial(true);
    setShowTutorial(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      {showTutorial && <OnboardingTutorial onComplete={handleTutorialComplete} />}
      
      <header className="w-full max-w-md mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent game-gradient">Word Spy</h1>
        <p className="text-gray-400">The sneaky word game for video calls</p>
      </header>
      
      {!gameSession ? (
        <>
          <GameSetup />
          {hasSeenTutorial && (
            <Button 
              variant="link" 
              onClick={() => setShowTutorial(true)}
              className="mt-4 text-green-400"
            >
              How to Play
            </Button>
          )}
        </>
      ) : (
        <GameInterface />
      )}
      
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Compatible with Zoom, Teams, Meet, and more</p>
        <p className="mt-1">© 2025 Word Spy</p>
      </footer>
    </div>
  );
};

export default Index;

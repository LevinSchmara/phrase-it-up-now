import React from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import Leaderboard from './Leaderboard';
import { Check } from 'lucide-react';

const PlayerInfoCard: React.FC<{ player: any; index: number }> = ({ player, index }) => {
  const { gameSession } = useGame();
  const isCurrentPlayer = player.id === player.id; // Placeholder logic
  const hasDetectedThis = false; // Placeholder logic

  // Get word counts from game settings or use defaults
  const wordCounts = gameSession?.gameSettings?.wordsPerCategory || {
    easy: 5,
    medium: 3,
    hard: 2
  };

  // Sample placeholder words for each difficulty
  const placeholderWords = {
    easy: ['apple', 'happy', 'sunny', 'music', 'beach', 'pizza', 'dance', 'smile'],
    medium: ['mountain', 'adventure', 'brilliant', 'chocolate', 'discover', 'freedom', 'harmony'],
    hard: ['extravaganza', 'kaleidoscope', 'magnificent', 'quadrilateral', 'serendipity']
  };

  // Calculate dynamic dimensions based on content
  const maxWords = Math.max(wordCounts.easy, wordCounts.medium, wordCounts.hard);
  const cardHeight = 180 + (maxWords * 28); // Base height + height per word
  
  // Calculate minimum card width based on word lengths
  const minCardWidth = 280; // Base minimum width
  const maxWordLength = Math.max(
    ...Object.values(placeholderWords).flatMap(words => 
      words.map(word => word.length)
    )
  );
  // Adjust card width based on longest word
  const cardWidth = Math.max(minCardWidth, Math.min(350, 200 + (maxWordLength * 5)));

  // Function to get a random word for a difficulty level and its width class
  const getRandomWord = (difficulty: 'easy' | 'medium' | 'hard', index: number) => {
    const words = placeholderWords[difficulty];
    // Use a consistent word for each position based on player ID and index
    const wordIndex = (player.id.charCodeAt(0) + index) % words.length;
    const word = words[wordIndex];
    
    // Determine width class based on word length
    let widthClass = 'w-16'; // Default width
    if (difficulty === 'easy') {
      widthClass = word.length > 8 ? 'w-24' : 'w-16';
    } else if (difficulty === 'medium') {
      widthClass = word.length > 10 ? 'w-32' : word.length > 6 ? 'w-24' : 'w-20';
    } else { // hard
      widthClass = word.length > 12 ? 'w-40' : word.length > 8 ? 'w-32' : 'w-24';
    }
    
    return { word, widthClass };
  };

  // Function to render word placeholders for a category
  const renderWordColumn = (difficulty: 'easy' | 'medium' | 'hard', count: number) => {
    const words = Array(count).fill(null);
    const isCurrentDifficulty = player.difficulty === difficulty;
    
    // Pre-calculate all words and their widths for this column
    const wordData = words.map((_, i) => {
      if (isCurrentDifficulty && i < (player.wordsAssigned?.[difficulty] || 0)) {
        return { word: '', widthClass: 'w-16' }; // Default width for assigned words
      }
      return getRandomWord(difficulty, i);
    });
    
    // Find the widest word in this column to ensure consistent width
    const columnWidth = wordData.reduce((max, { widthClass }) => {
      const width = parseInt(widthClass.replace('w-', ''));
      return width > max ? width : max;
    }, 0);
    
    return (
      <div key={difficulty} className="flex flex-col items-center gap-1">
        <div 
          className={`text-xs font-medium text-center p-1 rounded w-full ${
            isCurrentDifficulty ? 'bg-game-blue/20 text-game-blue' : 'bg-gray-100 dark:bg-gray-800'
          }`}
        >
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </div>
        <div className="flex-1 flex flex-col gap-1 w-full overflow-hidden">
          {words.map((_, i) => {
            const { word, widthClass } = wordData[i];
            const isAssigned = isCurrentDifficulty && i < (player.wordsAssigned?.[difficulty] || 0);
            
            return (
              <div 
                key={`${difficulty}-${i}`}
                className={`min-h-6 rounded border flex items-center justify-center text-xs px-1.5 text-center overflow-hidden ${
                  isAssigned 
                    ? 'bg-game-blue/10 border-game-blue/50 text-game-blue' 
                    : 'bg-white/10 border-gray-200 dark:border-gray-700 text-muted-foreground/70'
                } ${isAssigned ? 'w-16' : 'w-full max-w-full'} mx-auto`}
              >
                {isAssigned ? (
                  <Check className="w-3 h-3 text-game-blue flex-shrink-0" />
                ) : (
                  <span className="break-words">{word}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card
      className={`min-w-[280px] flex flex-col transition-all duration-200 ${
        index === 0 ? 'bg-game-yellow/20 dark:bg-game-yellow/10' : 'bg-white/50 dark:bg-game-dark/50'
      } ${isCurrentPlayer ? 'border-2 border-game-blue' : 'border border-gray-100 dark:border-gray-800'}`}
      style={{ 
        height: `${cardHeight}px`,
        width: `${cardWidth}px`,
        padding: '12px'
      }}
    >
      <div className="flex items-center gap-3 mb-3 px-1">
        <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${
          index === 0 ? 'bg-game-yellow text-black' : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          {index + 1}
        </div>
        <div className="min-w-0">
          <h3 className="font-medium truncate">{player.name}</h3>
          <p className="text-xs text-muted-foreground">Score: {player.score}</p>
        </div>
      </div>
      
      {/* Word Grid */}
      <div className="flex-1 grid grid-cols-3 gap-2 mb-3 px-1">
        {renderWordColumn('easy', wordCounts.easy)}
        {renderWordColumn('medium', wordCounts.medium)}
        {renderWordColumn('hard', wordCounts.hard)}
      </div>
      
      <Button
        variant="outline"
        size="sm"
        className="w-full mt-auto mx-auto max-w-[calc(100%-8px)]"
        disabled={hasDetectedThis}
      >
        {hasDetectedThis ? (
          <>
            <Check className="mr-2" size={16} />
            Detected
          </>
        ) : (
          'Detect Word'
        )}
      </Button>
    </Card>
  );
};

const NewGameScreen: React.FC = () => {
  const { gameSession } = useGame();

  if (!gameSession) {
    return null;
  }

  // Sort players by score
  const sortedPlayers = [...gameSession.players].sort((a, b) => b.score - a.score);

  return (
    <div className="h-full w-full flex flex-col">
      {/* Player Info Grid Section */}
      <div className="flex-1 min-h-0 flex items-center px-4 md:px-6">
        <div className="w-full overflow-x-auto no-scrollbar py-4">
          <div className="flex gap-4 md:gap-6">
            {sortedPlayers.map((player, index) => (
              <div key={player.id} className="flex-shrink-0">
                <PlayerInfoCard player={player} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="h-[200px] border-t border-gray-700 bg-black/80">
        <Leaderboard />
      </div>
    </div>
  );
};

export default NewGameScreen;

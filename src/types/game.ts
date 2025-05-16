
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  score: number;
  currentWord: string | null;
  difficulty: Difficulty;
  hasDetected: string[]; // Changed from boolean[] to string[] to store player IDs
  wordsAssigned: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export interface GameSession {
  id: string;
  name: string;
  players: Player[];
  isActive: boolean;
  inLobby: boolean; // Add this flag to track lobby state
  startTime: number;
  endTime: number | null;
  gameSettings: {
    wordsPerCategory: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

export interface WordBank {
  easy: string[];
  medium: string[];
  hard: string[];
}

export type GamePhase = 'lobby' | 'playing' | 'leaderboard';

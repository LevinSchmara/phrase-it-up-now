
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Player {
  id: string;
  name: string;
  score: number;
  currentWord: string | null;
  difficulty: Difficulty;
  hasDetected: boolean[];
}

export interface GameSession {
  id: string;
  name: string;
  players: Player[];
  isActive: boolean;
  startTime: number;
  endTime: number | null;
}

export interface WordBank {
  easy: string[];
  medium: string[];
  hard: string[];
}

export interface User {
  name: string;
  phone: string;
  email: string;
  age: number;
  standard: string; // e.g., "8th", "12th", "College 2nd Year"
  state: string;
  language: string;
  ecoPoints: number; // Re-interpretable as STEM points
  badges: string[];
  activityHistory: ActivityResult[];
}

export interface ChallengeData {
  title: string;
  problem: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface PuzzleData {
  title: string;
  puzzle: string;
  answer: string;
  explanation: string;
}


export enum ChallengeType {
  QUIZ = 'simple quiz question',
  MATH = 'math problem',
  LOGIC = 'logic puzzle',
}

export interface ActivityResult {
  activityType: 'Brain Check' | 'Puzzle' | 'Riddle';
  score: number;
  correct: number;
  wrong: number;
  total: number;
  date: string; // ISO date string
}
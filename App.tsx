import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import DashboardPage from './components/DashboardPage';
import BrainCheckPage from './components/ChallengeCard';
import PuzzlePage from './components/PuzzlePage';
import RiddlePage from './components/RiddlePage';
import { User, ChallengeData, ActivityResult, PuzzleData } from './types';
import { generateBrainCheck, generatePuzzles, generateRiddles } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activityState, setActivityState] = useState<'idle' | 'loading_brain_check' | 'active_brain_check' | 'loading_puzzle' | 'active_puzzle' | 'loading_riddle' | 'active_riddle'>('idle');
  const [brainCheckQuestions, setBrainCheckQuestions] = useState<ChallengeData[]>([]);
  const [puzzles, setPuzzles] = useState<PuzzleData[]>([]);
  const [riddles, setRiddles] = useState<PuzzleData[]>([]);
  const [lastActivityResult, setLastActivityResult] = useState<ActivityResult | null>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('stemQuestUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('stemQuestUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    localStorage.setItem('stemQuestUser', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setLastActivityResult(null); 
  };

  const handleLogout = () => {
    localStorage.removeItem('stemQuestUser');
    setUser(null);
    setActivityState('idle');
    setLastActivityResult(null);
  };

  const handleStartBrainCheck = async () => {
    if (!user) return;
    setActivityState('loading_brain_check');
    setLastActivityResult(null);
    try {
      const questions = await generateBrainCheck(user);
      if (questions.length < 10) {
          throw new Error("Not enough questions generated for Brain Check.");
      }
      setBrainCheckQuestions(questions);
      setActivityState('active_brain_check');
    } catch (error) {
      console.error("Failed to start Brain Check:", error);
      alert("Could not load the Brain Check. Please try again later.");
      setActivityState('idle');
    }
  };

  const handleStartPuzzles = async () => {
    if (!user) return;
    setActivityState('loading_puzzle');
    try {
        const puzzleData = await generatePuzzles(user);
        setPuzzles(puzzleData);
        setActivityState('active_puzzle');
    } catch (error) {
        console.error("Failed to start puzzles:", error);
        alert("Could not load the puzzle challenge. Please try again later.");
        setActivityState('idle');
    }
  };
  
  const handleStartRiddles = async () => {
    if (!user) return;
    setActivityState('loading_riddle');
    try {
        const riddleData = await generateRiddles(user);
        setRiddles(riddleData);
        setActivityState('active_riddle');
    } catch (error) {
        console.error("Failed to start riddles:", error);
        alert("Could not load the riddle challenge. Please try again later.");
        setActivityState('idle');
    }
  };

  const handleFinishActivity = (result: Omit<ActivityResult, 'date'>) => {
    if (!user) return;

    const resultWithDate: ActivityResult = { ...result, date: new Date().toISOString() };
    
    const updatedHistory = [...(user.activityHistory || []), resultWithDate];
    // Each correct answer gives 1 STEM point
    const updatedUser: User = { ...user, activityHistory: updatedHistory, ecoPoints: user.ecoPoints + result.score };

    localStorage.setItem('stemQuestUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setLastActivityResult(resultWithDate);
    setBrainCheckQuestions([]);
    setPuzzles([]);
    setRiddles([]);
    setActivityState('idle');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stem-bg">
        <div className="w-16 h-16 border-4 border-stem-primary border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (activityState === 'active_brain_check' && brainCheckQuestions.length > 0) {
    return <BrainCheckPage questions={brainCheckQuestions} onFinish={handleFinishActivity} />;
  }

  if (activityState === 'active_puzzle' && puzzles.length > 0) {
    return <PuzzlePage puzzles={puzzles} onFinish={handleFinishActivity} />;
  }

  if (activityState === 'active_riddle' && riddles.length > 0) {
    return <RiddlePage riddles={riddles} onFinish={handleFinishActivity} />;
  }

  return (
    <DashboardPage
      user={user}
      onLogout={handleLogout}
      onStartBrainCheck={handleStartBrainCheck}
      onStartPuzzle={handleStartPuzzles}
      onStartRiddle={handleStartRiddles}
      isLoading={activityState !== 'idle'}
      lastResult={lastActivityResult}
    />
  );
};

export default App;
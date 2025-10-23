import React, { useState } from 'react';
import { PuzzleData, ActivityResult } from '../types';

interface PuzzlePageProps {
  puzzles: PuzzleData[];
  onFinish: (result: Omit<ActivityResult, 'date'>) => void;
}

const PuzzlePage: React.FC<PuzzlePageProps> = ({ puzzles, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [points, setPoints] = useState(0);

  const currentPuzzle = puzzles[currentIndex];
  const isLastPuzzle = currentIndex === puzzles.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const correct = userAnswer.trim().toLowerCase() === currentPuzzle.answer.trim().toLowerCase();
    if (correct) {
      setPoints(points + 1); // Award 1 point per correct puzzle
    }
    setIsCorrect(correct);
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setIsCorrect(false);
    setUserAnswer('');
    setCurrentIndex(currentIndex + 1);
  };
  
  const progressPercentage = ((currentIndex + 1) / puzzles.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stem-bg p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Progress Bar and Counter */}
         <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-stem-primary">Puzzle Challenge</h2>
                <span className="text-sm font-semibold text-stem-dark bg-slate-200 px-3 py-1 rounded-full">
                    Puzzle {currentIndex + 1} <span className="text-gray-500">/ {puzzles.length}</span>
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-teal-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>

        {!submitted ? (
            <div>
                <h3 className="text-lg font-semibold text-stem-dark mb-1">{currentPuzzle.title}</h3>
                <p className="text-lg text-stem-dark mb-6" dangerouslySetInnerHTML={{ __html: currentPuzzle.puzzle }}></p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary"
                    aria-label="Puzzle answer"
                    />
                    <button
                    type="submit"
                    disabled={!userAnswer.trim()}
                    className="w-full bg-stem-primary hover:bg-stem-dark text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                    Submit Answer
                    </button>
                </form>
            </div>
        ) : (
          <div className="text-center p-4 rounded-lg animate-fade-in">
            {isCorrect ? (
              <div className="bg-teal-50 border-l-4 border-stem-secondary text-teal-800 p-4">
                 <p className="text-2xl font-bold">🎉 Correct! (+1 point) 🎉</p>
              </div>
            ) : (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4">
                <p className="text-2xl font-bold">🤔 Not Quite...</p>
                <p className="mt-1">The correct answer was: <span className="font-bold">{currentPuzzle.answer}</span></p>
              </div>
            )}
            <p className="mt-4 text-slate-700">{currentPuzzle.explanation}</p>
            
            {!isLastPuzzle ? (
                <button
                    onClick={handleNext}
                    className="mt-6 w-full bg-stem-secondary hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                >
                    Next Puzzle
                </button>
            ) : (
                <div className="mt-6 bg-slate-100 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold text-stem-primary">Puzzle Challenge Complete!</h3>
                    <p className="text-slate-600 mt-2">Great job on the puzzles. You earned {points} points!</p>
                    <button
                        onClick={() => {
                           const result = {
                                activityType: 'Puzzle' as const,
                                score: points,
                                correct: points,
                                wrong: puzzles.length - points,
                                total: puzzles.length,
                            };
                            onFinish(result);
                        }}
                        className="mt-4 w-full bg-stem-primary hover:bg-stem-dark text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105"
                        >
                        Back to Dashboard
                    </button>
                </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzlePage;
import React, { useState } from 'react';
import { ChallengeData, ActivityResult } from '../types';

interface BrainCheckPageProps {
  questions: ChallengeData[];
  onFinish: (result: Omit<ActivityResult, 'date'>) => void;
}

const BrainCheckPage: React.FC<BrainCheckPageProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [allAnswers, setAllAnswers] = useState<string[]>([]);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...allAnswers, selectedAnswer];
    setAllAnswers(newAnswers);

    if (!isLastQuestion) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null); // Reset selection for the next question
    } else {
      // Finish the brain check
      let score = 0;
      newAnswers.forEach((answer, index) => {
        if (answer.trim().toLowerCase() === questions[index].answer.trim().toLowerCase()) {
          score += 1; // Each question is worth 1 point
        }
      });
      const result = {
        activityType: 'Brain Check' as const,
        score,
        correct: score,
        wrong: questions.length - score,
        total: questions.length,
      };
      onFinish(result);
    }
  };
  
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stem-bg p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Progress Bar and Counter */}
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold text-stem-primary">Brain Check</h2>
                <span className="text-sm font-semibold text-stem-dark bg-slate-200 px-3 py-1 rounded-full">
                    Question {currentIndex + 1} <span className="text-gray-500">/ {questions.length}</span>
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-stem-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>

        {/* Question Content */}
        <div>
            <p className="text-lg font-semibold text-stem-dark mb-4" dangerouslySetInnerHTML={{ __html: currentQuestion.problem }}></p>
            <div className="space-y-3">
                {currentQuestion.options?.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelectAnswer(option)}
                        className={`w-full text-left p-4 border-2 rounded-lg transition-all duration-200 text-gray-700
                            ${selectedAnswer === option 
                                ? 'bg-sky-100 border-stem-primary text-stem-dark font-bold shadow-md' 
                                : 'bg-white border-gray-300 hover:bg-slate-50 hover:border-stem-primary'}`
                        }
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
            <button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="w-full bg-stem-primary hover:bg-stem-dark text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
            >
                {isLastQuestion ? 'Finish' : 'Next Question'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default BrainCheckPage;
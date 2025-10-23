import React from 'react';
import { User, ActivityResult } from '../types';
import EduSparkInfo from './EduSparkInfo';

interface DashboardPageProps {
  user: User;
  onLogout: () => void;
  onStartBrainCheck: () => void;
  onStartPuzzle: () => void;
  onStartRiddle: () => void;
  isLoading: boolean;
  lastResult: ActivityResult | null;
}

const Header: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <div className="flex items-center">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-stem-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 00-4.132 0M9.75 3.104c-.391 0-.776.017-1.147.052M9.75 15.75c3.439 0 6.25-2.812 6.25-6.25s-2.811-6.25-6.25-6.25-6.25 2.812-6.25 6.25 2.811 6.25 6.25 6.25zM9.75 15.75c2.73 0 4.943-2.213 4.943-4.943s-2.213-4.943-4.943-4.943-4.943 2.213-4.943 4.943 2.213 4.943 4.943 4.943z" />
       </svg>
      <h1 className="text-2xl font-bold text-stem-dark">STEM Quest</h1>
    </div>
    <div className="flex items-center space-x-4">
      <p className="font-semibold text-stem-dark hidden sm:block">{user.name}</p>
      <button 
        onClick={onLogout}
        className="bg-stem-secondary hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  </header>
);

const ResultsDonutChart: React.FC<{ result: ActivityResult }> = ({ result }) => {
    const { correct, total } = result;
    const percentage = total > 0 ? (correct / total) * 100 : 0;
    const size = 120; // SVG size
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="text-red-200"
                    fill="transparent"
                    stroke="currentColor"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="text-stem-secondary"
                    fill="transparent"
                    stroke="currentColor"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-stem-dark">{correct}</span>
                <span className="text-sm text-gray-500">/ {total}</span>
            </div>
        </div>
    );
};

const ActivityHistory: React.FC<{ history: ActivityResult[] }> = ({ history }) => (
    <div className="mt-6">
        <h4 className="text-xl font-semibold text-stem-dark border-t pt-4">Activity History</h4>
        {history && history.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto mt-2 pr-2">
                {history.slice().reverse().map((res, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-100 p-3 rounded-lg">
                        <div>
                            <span className="font-bold text-stem-dark">{res.activityType}</span>
                            <span className="text-sm text-gray-600 font-medium ml-2">{new Date(res.date).toLocaleDateString()}</span>
                        </div>
                        <span className={`font-bold text-lg ${res.score >= res.total / 2 ? 'text-stem-secondary' : 'text-red-500'}`}>
                            {res.score} / {res.total}
                        </span>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 py-8">Your history will appear here.</p>
        )}
    </div>
);

const ActivityButton: React.FC<{onClick: () => void, disabled: boolean, icon: string, title: string, description: string, color: string}> = 
({onClick, disabled, icon, title, description, color}) => (
    <button onClick={onClick} disabled={disabled} className={`w-full text-left p-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center space-x-4 ${color}`}>
        <span className="text-4xl">{icon}</span>
        <div>
            <span className="font-bold text-lg text-white">{title}</span>
            <p className="text-sm text-gray-200">{description}</p>
        </div>
    </button>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ user, onLogout, onStartBrainCheck, onStartPuzzle, onStartRiddle, isLoading, lastResult }) => {
  return (
    <div className="bg-stem-bg min-h-screen">
      <Header user={user} onLogout={onLogout} />
      <main className="p-4 md:p-8">
         <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-stem-dark mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
              <p className="text-gray-600">Ready for your next STEM challenge?</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">STEM Points</div>
              <div className="text-3xl font-bold text-stem-secondary">{user.ecoPoints}</div>
            </div>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Activities Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Games Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-4">
                <h3 className="text-2xl font-bold text-stem-primary border-b pb-2 mb-2">Games</h3>
                <p className="text-gray-600 text-sm">Warm up with these fun challenges!</p>
                <ActivityButton 
                    onClick={onStartPuzzle}
                    disabled={isLoading}
                    icon="💡"
                    title="Puzzle Challenge"
                    description="Solve 10 fun logic puzzles."
                    color="bg-teal-500 hover:bg-teal-600"
                />
                 <ActivityButton 
                    onClick={onStartRiddle}
                    disabled={isLoading}
                    icon="❓"
                    title="Riddle Challenge"
                    description="Answer 10 tricky riddles."
                    color="bg-amber-500 hover:bg-amber-600"
                />
            </div>
            
            {/* Brain Check Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col">
                <h3 className="text-2xl font-bold text-stem-primary border-b pb-2 mb-2">Brain Check</h3>
                <p className="text-gray-600 text-sm mb-4">Test your knowledge with a quick 10-question quiz.</p>
                <div className="flex-grow flex items-center justify-center">
                    <ActivityButton 
                        onClick={onStartBrainCheck}
                        disabled={isLoading}
                        icon="🧠"
                        title="Start Brain Check"
                        description="Are you ready?"
                        color="bg-sky-600 hover:bg-sky-700"
                    />
                </div>
            </div>

            {/* Results and History Section */}
             <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                {lastResult ? (
                  <>
                    <h3 className="text-2xl font-bold text-stem-primary mb-4">Your Latest Result ({lastResult.activityType})</h3>
                    <div className="flex flex-col md:flex-row items-center justify-center md:justify-around gap-6 p-4">
                       <ResultsDonutChart result={lastResult} />
                       <div className="text-center md:text-left space-y-1">
                           <p className="text-2xl font-bold text-stem-dark">
                                Score: <span className="text-stem-secondary">{lastResult.score}</span>
                            </p>
                            <p className="text-lg text-gray-600">Correct Answers: <span className="font-semibold text-green-600">{lastResult.correct}</span></p>
                            <p className="text-lg text-gray-600">Wrong Answers: <span className="font-semibold text-red-600">{lastResult.wrong}</span></p>
                       </div>
                    </div>
                    <ActivityHistory history={user.activityHistory || []} />
                  </>
                ) : (
                  <>
                     <h3 className="text-2xl font-bold text-stem-primary mb-4">Results & History</h3>
                      <div className="text-center text-gray-500 py-12 flex flex-col items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stem-light-gray mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>Complete an activity to see your results here.</span>
                    </div>
                  </>
                )}
            </div>

          </div>

          {/* Profile Section */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-stem-primary border-b pb-2 mb-4">Your Profile</h3>
            <div className="space-y-3 text-stem-dark">
                <div><p className="text-sm text-gray-500">Name</p><p className="font-semibold text-lg">{user.name}</p></div>
                <div><p className="text-sm text-gray-500">Age</p><p className="font-semibold text-lg">{user.age}</p></div>
                <div><p className="text-sm text-gray-500">Standard</p><p className="font-semibold text-lg">{user.standard}</p></div>
                <div><p className="text-sm text-gray-500">Language</p><p className="font-semibold text-lg">{user.language}</p></div>
            </div>
             {isLoading && (
              <div className="mt-6 border-t pt-4 flex items-center justify-center space-x-2 text-gray-500">
                  <div className="w-6 h-6 border-2 border-stem-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
              </div>
            )}
          </div>

        </div>
        
        <EduSparkInfo />

      </main>
    </div>
  );
};

export default DashboardPage;
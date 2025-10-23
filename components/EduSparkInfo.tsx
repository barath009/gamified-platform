import React from 'react';

// A simple icon component to avoid repeating SVG code
const FeatureIcon = ({ path }: { path: string }) => (
  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-sky-100 text-stem-primary flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  </div>
);

// A step number component for "How it works"
const StepNumber = ({ number }: { number: string }) => (
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-teal-100 text-stem-secondary font-bold flex items-center justify-center">
        {number}
    </div>
);

const EduSparkInfo: React.FC = () => {
  return (
    <div className="bg-white text-stem-dark rounded-xl shadow-lg p-6 md:p-10 my-8">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-sm font-bold uppercase text-stem-primary tracking-widest">EduSpark Platform</h2>
        <p className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight">
          Increase Student Engagement by 15%
        </p>
        <p className="mt-4 text-lg text-slate-600">
          Using gamified learning and powerful analytics to empower both students and teachers.
        </p>
      </div>

      <div className="mt-12">
        <p className="text-center text-lg text-slate-700 max-w-3xl mx-auto">
          EduSpark is a dynamic mobile and web platform designed to make learning accessible and exciting. It runs smoothly on <strong>low-cost devices</strong>, making it perfect for rural schools, and provides teachers with the tools they need to <strong>track student progress</strong> effectively.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-12">
        <div>
          <h3 className="text-2xl font-bold text-stem-dark mb-6">Core Features</h3>
          <ul className="space-y-6">
            <li className="flex items-start">
              <FeatureIcon path="M4.5 12.75l6 6 9-13.5" />
              <div className="ml-4">
                <h4 className="font-semibold text-lg">Gamified Lessons & Quizzes</h4>
                <p className="text-slate-500">Engaging challenges that make learning core subjects fun.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FeatureIcon path="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
               <div className="ml-4">
                <h4 className="font-semibold text-lg">Real-time Teacher Analytics</h4>
                <p className="text-slate-500">Track student progress and performance instantly.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FeatureIcon path="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
               <div className="ml-4">
                <h4 className="font-semibold text-lg">Offline & Low-Bandwidth Mode</h4>
                <p className="text-slate-500">Works smoothly even with limited internet connectivity.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FeatureIcon path="M10.5 21l-5.25-5.25a7.5 7.5 0 0110.5 0L10.5 21z" />
               <div className="ml-4">
                <h4 className="font-semibold text-lg">Multilingual Learning</h4>
                <p className="text-slate-500">Available in English and regional languages for inclusivity.</p>
              </div>
            </li>
             <li className="flex items-start">
              <FeatureIcon path="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691L15 12.001M9 12.001L15 12.001M9 12.001L2.985 19.644" />
               <div className="ml-4">
                <h4 className="font-semibold text-lg">Adaptive Learning Paths</h4>
                <p className="text-slate-500">Automatically adjusts content based on learning speed.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-slate-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-stem-dark mb-6">How It Works</h3>
            <ol className="space-y-6">
                <li className="flex items-start">
                    <StepNumber number="1" />
                    <div className="ml-4">
                        <h4 className="font-semibold text-lg">Log In & Play</h4>
                        <p className="text-slate-500">Students access the platform to play interactive learning games.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <StepNumber number="2" />
                    <div className="ml-4">
                        <h4 className="font-semibold text-lg">Sync Progress</h4>
                        <p className="text-slate-500">Performance data is stored and synced automatically.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <StepNumber number="3" />
                    <div className="ml-4">
                        <h4 className="font-semibold text-lg">View Analytics</h4>
                        <p className="text-slate-500">Teachers view insights and provide feedback to improve outcomes.</p>
                    </div>
                </li>
            </ol>
            <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-md font-semibold text-stem-dark italic">
                    “EduSpark helps rural schools boost engagement, improve learning outcomes, and reduce teacher workload.”
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EduSparkInfo;

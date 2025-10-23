import React, { useState } from 'react';
import { User } from '../types';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    standard: '',
    state: '',
    language: 'English',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
        const { name, phone, email, age, standard, state, language } = formData;
        if (!name || !phone || !email || !age || !standard || !state || !language) {
            setError('All fields are required for registration.');
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        const ageNum = parseInt(age, 10);
        if (isNaN(ageNum) || ageNum < 5 || ageNum > 100) {
            setError('Please enter a valid age.');
            return;
        }

        const newUser: User = {
            name,
            phone,
            email,
            age: ageNum,
            standard,
            state,
            language,
            ecoPoints: 0,
            badges: [],
            activityHistory: [],
        };
        onLogin(newUser);
    } else {
        // Dummy login for demonstration
        const { email } = formData;
         if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setError('Please enter a valid email to log in.');
            return;
        }
        const dummyUser: User = {
            name: 'Priya Sharma',
            phone: '9876543210',
            email: email,
            age: 14,
            standard: '9th',
            state: 'Rajasthan',
            language: 'English',
            ecoPoints: 250,
            badges: ['Curious Mind', 'Problem Solver'],
            activityHistory: [],
        };
        onLogin(dummyUser);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-stem-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
           <h1 className="text-4xl font-bold text-stem-dark flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3 text-stem-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 00-4.132 0M9.75 3.104c-.391 0-.776.017-1.147.052M9.75 15.75c3.439 0 6.25-2.812 6.25-6.25s-2.811-6.25-6.25-6.25-6.25 2.812-6.25 6.25 2.811 6.25 6.25 6.25zM9.75 15.75c2.73 0 4.943-2.213 4.943-4.943s-2.213-4.943-4.943-4.943-4.943 2.213-4.943 4.943 2.213 4.943 4.943 4.943z" />
             </svg>
            STEM Quest
          </h1>
          <p className="text-slate-600 mt-2">Unlock your potential, one challenge at a time.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setIsRegistering(true)}
              className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${isRegistering ? 'text-stem-primary border-b-2 border-stem-primary' : 'text-gray-500'}`}
            >
              Register
            </button>
            <button
              onClick={() => setIsRegistering(false)}
              className={`w-1/2 py-3 text-center font-semibold transition-colors duration-300 ${!isRegistering ? 'text-stem-primary border-b-2 border-stem-primary' : 'text-gray-500'}`}
            >
              Login
            </button>
          </div>

          <h2 className="text-2xl font-bold text-stem-dark mb-4 text-center">{isRegistering ? 'Create Your Account' : 'Welcome Back!'}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
                <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
              </>
            )}
            <input type="email" name="email" placeholder="Email ID" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
            {isRegistering && (
              <>
                <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
                <input type="text" name="standard" placeholder="Standard Pursuing (e.g., 9th)" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
                <input type="text" name="state" placeholder="State" onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary" />
                 <select name="language" value={formData.language} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stem-primary bg-white">
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Telugu">Telugu</option>
                </select>
              </>
            )}
             {!isRegistering && (
                <div className="text-sm text-gray-500">
                    Enter your email to log in. (Demo)
                </div>
            )}
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <button type="submit" className="w-full bg-stem-primary hover:bg-stem-dark text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105">
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
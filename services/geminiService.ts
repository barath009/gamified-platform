import { GoogleGenAI, Type } from "@google/genai";
import { User, ChallengeData, PuzzleData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getDifficulty(age: number): string {
    if (age <= 10) return 'Very Easy, for young children (grades 6-7)';
    if (age <= 14) return 'Easy, for early teenagers (grades 8-10)';
    return 'Medium, for older teenagers (grades 11-12)';
}

export async function generateBrainCheck(user: User): Promise<ChallengeData[]> {
  const difficulty = getDifficulty(user.age);
  
  const prompt = `
    You are an expert in STEM education creating a 10-question "Brain Check" for a student in a rural school in India.
    The goal is to be a quick and fun test of knowledge.
    The Brain Check must contain a mix of 10 questions from Science (Physics, Chemistry, Biology), Technology, Engineering, and Mathematics.
    All 10 questions must be unique.

    The student's profile is:
    - Age: ${user.age}
    - Standard (Grade): ${user.standard}
    - Preferred Language: ${user.language}
    - Difficulty Level: ${difficulty}

    CRITICAL INSTRUCTIONS:
    - ALL content (questions, options, answers, explanations) MUST be in the student's preferred language: "${user.language}".
    - The questions should be culturally relevant to India where appropriate.

    For EACH of the 10 questions, you must provide:
    1. A 'title' for the question's topic (e.g., "Gravity", "Computer Basics").
    2. A clear 'problem' (the question itself).
    3. An array of exactly 4 multiple-choice 'options'.
    4. The correct 'answer' as a string that exactly matches one of the options.
    5. A brief, encouraging 'explanation' of why the answer is correct.
    
    Please generate the 10 questions now in a valid JSON array format.
  `;
  
  const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'A short title for the question topic (e.g., "Gravity").' },
          problem: { type: Type.STRING, description: 'The full text of the question.' },
          options: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: 'An array of exactly 4 multiple-choice options.'
          },
          answer: { type: Type.STRING, description: 'The correct answer, matching one of the options exactly.' },
          explanation: { type: Type.STRING, description: 'A brief explanation of the correct answer.' }
        },
        required: ['title', 'problem', 'options', 'answer', 'explanation']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error("API returned an invalid or empty array of questions.");
    }
    
    data.forEach(q => {
        if(!q.options || q.options.length !== 4) {
            console.warn("Question did not have 4 options, patching...", q);
            q.options = q.options || [];
            while(q.options.length < 4) { q.options.push("Invalid option"); }
            q.options = q.options.slice(0, 4);
        }
    });

    return data as ChallengeData[];

  } catch (error) {
    console.error("Error generating Brain Check with Gemini:", error);
    throw new Error("Failed to communicate with the AI model. Please check your connection and try again.");
  }
}

export async function generatePuzzles(user: User): Promise<PuzzleData[]> {
  const difficulty = getDifficulty(user.age);

  const prompt = `
    You are an expert in STEM education creating a series of 10 simple and fun puzzles for a student in a rural school in India.
    The puzzles should be logic problems related to Science, Technology, Engineering, or Math.
    Make them engaging and easier than a typical test question. They are a fun warm-up activity.

    The student's profile is:
    - Age: ${user.age}
    - Standard (Grade): ${user.standard}
    - Preferred Language: ${user.language}
    - Difficulty Level: ${difficulty}

    CRITICAL INSTRUCTIONS:
    - ALL content (puzzle, answer, explanation) MUST be in the student's preferred language: "${user.language}".
    - The puzzles should be culturally relevant to India if possible.
    - The answer for each puzzle should be a single word or a short phrase.
    - Generate exactly 10 unique puzzles.

    For EACH of the 10 puzzles, please provide:
    1. A 'title' for the puzzle's topic (e.g., "Physics Puzzle").
    2. The 'puzzle' text itself.
    3. The correct 'answer' as a short string.
    4. A brief, encouraging 'explanation' of the answer.

    Generate the 10 puzzles now in a valid JSON array format.
  `;
  
  const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            puzzle: { type: Type.STRING },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING }
        },
        required: ['title', 'puzzle', 'answer', 'explanation']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const puzzles = JSON.parse(jsonText);

    if (!Array.isArray(puzzles) || puzzles.length !== 10) {
        throw new Error("API did not return 10 puzzles as requested.");
    }
    return puzzles as PuzzleData[];

  } catch (error) {
    console.error("Error generating puzzles with Gemini:", error);
    throw new Error("Failed to communicate with the AI model for the puzzles. Please try again.");
  }
}

export async function generateRiddles(user: User): Promise<PuzzleData[]> {
  const difficulty = getDifficulty(user.age);

  const prompt = `
    You are an expert in STEM education creating a series of 10 fun riddles for a student in a rural school in India.
    The riddles must be about concepts in Science, Technology, Engineering, or Math.
    Make them engaging and clever. They are a fun warm-up activity.

    The student's profile is:
    - Age: ${user.age}
    - Standard (Grade): ${user.standard}
    - Preferred Language: ${user.language}
    - Difficulty Level: ${difficulty}

    CRITICAL INSTRUCTIONS:
    - ALL content (riddle, answer, explanation) MUST be in the student's preferred language: "${user.language}".
    - The riddles should be culturally relevant to India if possible.
    - The answer for each riddle should be a single word or a short phrase.
    - Generate exactly 10 unique riddles.

    For EACH of the 10 riddles, please provide:
    1. A 'title' for the riddle's topic (e.g., "Water Cycle Riddle").
    2. The 'puzzle' text itself (this is the riddle).
    3. The correct 'answer' as a short string.
    4. A brief, encouraging 'explanation' of the answer.

    Generate the 10 riddles now in a valid JSON array format.
  `;
  
  const responseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING },
            puzzle: { type: Type.STRING },
            answer: { type: Type.STRING },
            explanation: { type: Type.STRING }
        },
        required: ['title', 'puzzle', 'answer', 'explanation']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const riddles = JSON.parse(jsonText);

    if (!Array.isArray(riddles) || riddles.length !== 10) {
        throw new Error("API did not return 10 riddles as requested.");
    }
    return riddles as PuzzleData[];

  } catch (error) {
    console.error("Error generating riddles with Gemini:", error);
    throw new Error("Failed to communicate with the AI model for the riddles. Please try again.");
  }
}
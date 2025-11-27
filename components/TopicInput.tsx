import React, { useState } from 'react';

interface TopicInputProps {
  onGenerate: (topic: string) => void;
  isLoading: boolean;
}

export const TopicInput: React.FC<TopicInputProps> = ({ onGenerate, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center px-4 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
        Lær hva som helst med <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI-Flashcards</span>
      </h1>
      <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
        Skriv inn et emne du vil øve på (f.eks. "Fotosyntese", "Andre Verdenskrig", "Spansk gramatikk"), så lager vi en kortstokk til deg.
      </p>
      
      <form onSubmit={handleSubmit} className="relative flex items-center justify-center">
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
                type="text" 
                className="block w-full p-4 pl-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all outline-none" 
                placeholder="Hva vil du lære i dag?" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isLoading}
            />
            <button 
                type="submit" 
                disabled={isLoading || !topic.trim()}
                className="text-white absolute right-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-full text-sm px-6 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Tenker...
                    </span>
                ) : 'Generer Kort'}
            </button>
        </div>
      </form>
    </div>
  );
};
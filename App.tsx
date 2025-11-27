import React, { useState } from 'react';
import { TopicInput } from './components/TopicInput';
import { Flashcard } from './components/Flashcard';
import { Footer } from './components/Footer';
import { generateFlashcards } from './services/geminiService';
import { FlashcardData, GenerationState } from './types';

const App: React.FC = () => {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [generationState, setGenerationState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    isGenerated: false
  });
  const [currentTopic, setCurrentTopic] = useState<string>('');

  const handleGenerate = async (topic: string) => {
    setGenerationState({ isLoading: true, error: null, isGenerated: false });
    setCurrentTopic(topic);
    
    try {
      const cards = await generateFlashcards(topic);
      setFlashcards(cards);
      setGenerationState({ isLoading: false, error: null, isGenerated: true });
    } catch (err: any) {
      setGenerationState({ 
        isLoading: false, 
        error: err.message || "Noe gikk galt. Prøv igjen.", 
        isGenerated: false 
      });
    }
  };

  const handleReset = () => {
    setFlashcards([]);
    setGenerationState({ isLoading: false, error: null, isGenerated: false });
    setCurrentTopic('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden">
      <header className="w-full bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2" onClick={handleReset} role="button">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                K
            </div>
            <span className="font-bold text-xl text-slate-800">KortLærer</span>
        </div>
        {generationState.isGenerated && (
             <button 
                onClick={handleReset}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
             >
                 Nytt Emne
             </button>
        )}
      </header>

      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!generationState.isGenerated && (
            <div className="flex-grow flex flex-col justify-center w-full">
                <TopicInput onGenerate={handleGenerate} isLoading={generationState.isLoading} />
                
                {generationState.error && (
                    <div className="mt-6 max-w-md mx-auto p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-center animate-fade-in">
                        {generationState.error}
                    </div>
                )}

                {/* Example topics */}
                {!generationState.isLoading && !generationState.error && (
                    <div className="mt-8 text-center animate-fade-in-up">
                        <p className="text-slate-500 text-sm mb-4">Populære emner akkurat nå:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {["Periodesystemet", "Den Franske Revolusjon", "Pythagoras", "Norsk Grammatikk", "Engelske verb"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => handleGenerate(item)}
                                    className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

        {generationState.isGenerated && (
            <div className="w-full py-12 animate-fade-in">
                <div className="flex items-baseline justify-between mb-8 border-b border-slate-200 pb-4">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Resultater for: <span className="text-indigo-600">{currentTopic}</span>
                    </h2>
                    <span className="text-slate-500 text-sm">{flashcards.length} kort</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {flashcards.map((card) => (
                        <Flashcard key={card.id} data={card} />
                    ))}
                </div>
                
                <div className="mt-16 text-center">
                    <button 
                        onClick={handleReset}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                    >
                        Lag nye kort
                    </button>
                </div>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
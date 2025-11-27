import React, { useState } from 'react';
import { FlashcardData } from '../types';

interface FlashcardProps {
  data: FlashcardData;
}

export const Flashcard: React.FC<FlashcardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="group perspective-1000 w-full h-64 sm:h-80 cursor-pointer"
      onClick={handleFlip}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d shadow-xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden w-full h-full bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center border-2 border-indigo-50">
          <div className="absolute top-4 left-4">
             <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
               Spørsmål
             </span>
          </div>
          {data.category && (
             <div className="absolute top-4 right-4 text-slate-400 text-xs font-medium uppercase tracking-wider">
               {data.category}
             </div>
          )}
          <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed px-4">
            {data.question}
          </p>
          <div className="absolute bottom-4 text-slate-400 text-sm">
            Trykk for å se svaret
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white">
          <div className="absolute top-4 left-4">
             <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
               Svar
             </span>
          </div>
          <p className="text-lg sm:text-xl font-medium leading-relaxed px-4">
            {data.answer}
          </p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 py-8 text-center text-slate-400 text-sm">
      <p>Drevet av Google Gemini AI</p>
      <p className="mt-1">&copy; {new Date().getFullYear()} KortLærer</p>
    </footer>
  );
};
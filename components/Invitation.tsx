
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface InvitationProps {
  onAccept: (note: string) => void;
}

const Invitation: React.FC<InvitationProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [isMoved, setIsMoved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const btnWidth = 120;
    const btnHeight = 50;

    const maxX = container.width - btnWidth - 20;
    const maxY = container.height - btnHeight - 20;
    
    const newX = Math.max(10, Math.random() * maxX);
    const newY = Math.max(10, Math.random() * maxY);

    setNoButtonPos({ x: newX, y: newY });
    setIsMoved(true);
    setAttempts(prev => prev + 1);
  };

  const handleYes = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate a super cute, short, and poetic message (max 3 sentences) for a girl who just said 'Yes' to being someone's Valentine. She loves noodles, pineapple pastry, the moon, and chai. Use emojis related to these things (🍜🍍🌙☕). Keep it incredibly sweet and romantic.",
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      
      const message = response.text || "You made my day! I'm the luckiest person alive. ❤️";
      onAccept(message);
    } catch (error) {
      console.error("AI failed to generate message", error);
      onAccept("You just made my heart skip a beat! Can't wait for our date with chai and noodles under the moon! 🌙❤️");
    } finally {
      setIsLoading(false);
    }
  };

  const noButtonPhrases = [
    "No 😢",
    "Think of the chai! ☕",
    "But... noodles? 🍜",
    "Pineapple pastry? 🍍",
    "The moon is watching! 🌙",
    "Surely not?",
    "Click the red one!",
    "No pineapple pastry for you!",
    "I'll buy you noodles!",
    "Still no? 🥺"
  ];

  return (
    <div 
      ref={containerRef}
      className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center border-4 border-pink-200 relative min-h-[550px] flex flex-col justify-center transition-all duration-500 hover:shadow-pink-200/50"
    >
      <div className="absolute top-4 right-4 text-2xl animate-pulse">🌙</div>
      <div className="absolute bottom-4 left-4 text-2xl animate-bounce">☕</div>

      <div className="mb-6 pointer-events-none select-none">
        <div className="relative inline-block">
          <img 
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${attempts > 5 ? 'cry' : 'love'}&backgroundColor=ffdfbf`} 
            alt="Cute Avatar" 
            className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-md mb-6 transition-transform duration-300 transform hover:scale-110"
          />
          <div className="absolute -bottom-2 -right-2 text-4xl transform rotate-12">🍜</div>
        </div>
        <h1 className="text-4xl md:text-5xl font-pacifico text-pink-600 mb-4 animate-bounce">
          Will you be my Valentine?
        </h1>
        <p className="text-slate-600 text-lg italic px-4">
          {attempts === 0 
            ? "I've been thinking about this under the moonlight... 🌙" 
            : attempts < 5 
              ? "Hey! We haven't even had our chai yet! ☕" 
              : "I guess I'll have to eat all the noodles myself? 🍜"}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4 relative h-32">
        <button
          onClick={handleYes}
          disabled={isLoading}
          style={{ transform: `scale(${1 + attempts * 0.1})` }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-all active:scale-95 disabled:opacity-50 text-xl z-20 whitespace-nowrap"
        >
          {isLoading ? "✨ Baking Pastry... ✨" : "YES! ❤️"}
        </button>

        <button
          onMouseEnter={moveButton}
          onClick={moveButton}
          style={isMoved ? {
            position: 'absolute',
            left: `${noButtonPos.x}px`,
            top: `${noButtonPos.y}px`,
            transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
          } : {}}
          className="bg-slate-200 hover:bg-slate-300 text-slate-600 font-bold py-3 px-10 rounded-full shadow-md text-lg whitespace-nowrap z-10 transition-colors"
        >
          {noButtonPhrases[Math.min(attempts, noButtonPhrases.length - 1)]}
        </button>
      </div>
      
      <p className="mt-8 text-sm text-pink-400 opacity-80 font-medium">
        {attempts > 0 ? `Attempts to decline: ${attempts}` : "Noodles, chai, and you. Perfect! 🍜☕✨"}
      </p>
    </div>
  );
};

export default Invitation;


import React from 'react';

interface CelebrationProps {
  note: string;
}

const Celebration: React.FC<CelebrationProps> = ({ note }) => {
  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center border-4 border-rose-300 animate-[bounce_1s_ease-in-out_1] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none grid grid-cols-4 gap-4 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="text-4xl">{['🍜', '🌙', '☕', '🍍'][i % 4]}</span>
        ))}
      </div>

      <div className="relative inline-block mb-6">
        <span className="text-9xl animate-pulse inline-block">🌙</span>
        <div className="absolute -top-4 -right-4 animate-spin duration-[5000ms]">
          <span className="text-4xl">✨</span>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-5xl">💖</span>
        </div>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-pacifico text-rose-600 mb-6 drop-shadow-sm">
        Moonlight & Chai!
      </h2>
      
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-8 mb-8 border-2 border-rose-100 shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent"></div>
        <p className="text-2xl text-rose-800 leading-relaxed font-semibold italic relative z-10">
          {note}
        </p>
        <div className="absolute bottom-0 right-0 p-2 opacity-10 group-hover:opacity-30 transition-opacity">
          <span className="text-6xl">🍜</span>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-slate-600 text-xl font-medium px-4">
          I'm getting the noodles and pineapple pastry ready! 🍍🍰
        </p>
        
        <div className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap">
           <div className="flex flex-col items-center gap-1">
             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-50 flex items-center justify-center text-4xl shadow-md border-2 border-white transform rotate-3">☕</div>
             <span className="text-[10px] text-amber-600 font-bold uppercase">Hot Chai</span>
           </div>
           <div className="flex flex-col items-center gap-1">
             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pink-100 flex items-center justify-center text-5xl shadow-xl border-4 border-white z-10 animate-pulse">🍜</div>
             <span className="text-xs text-rose-500 font-black uppercase">Noodle Date</span>
           </div>
           <div className="flex flex-col items-center gap-1">
             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-yellow-50 flex items-center justify-center text-4xl shadow-md border-2 border-white transform -rotate-3">🍍</div>
             <span className="text-[10px] text-yellow-600 font-bold uppercase">Pastry</span>
           </div>
        </div>

        <div className="pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="text-rose-400 hover:text-rose-600 transition-all font-bold text-sm bg-rose-50 hover:bg-rose-100 px-6 py-2 rounded-full border border-rose-200"
          >
            Reset & Play Again? 🔄
          </button>
        </div>
      </div>
      
      <p className="mt-8 text-rose-300 text-xs uppercase tracking-widest font-black">
        A special invite for a special person
      </p>
    </div>
  );
};

export default Celebration;

import React from 'react';

const ModelCard = ({ name, description, metrics, onStart }) => {
  return (
    <div className="glass-card group p-8 flex flex-col items-center text-center h-full hover:border-lavender/30 transition-all duration-500">
      <div className="h-16 w-16 bg-lavender/10 rounded-3xl flex items-center justify-center mb-6 border border-lavender/20 group-hover:bg-lavender group-hover:text-white transition-all duration-500 shadow-xl group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 leading-none group-hover:text-lavender transition-colors">{name}</h3>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 italic">Software Lifecycle</p>
      
      <p className="text-slate-400 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
        {description}
      </p>

      {/* Mini Metrics for quick learning */}
      <div className="flex gap-2 mb-10 flex-wrap justify-center mt-auto">
        {metrics && Object.entries(metrics).slice(0, 3).map(([key, val]) => (
          <div key={key} className="bg-white/5 px-3 py-1.5 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-0.5">{key}</span>
            <span className="text-[10px] text-slate-200 font-bold uppercase">{val}</span>
          </div>
        ))}
      </div>

      <button 
        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] hover:bg-lavender hover:text-white hover:border-lavender transition-all duration-300 shadow-lg group-hover:shadow-[0_10px_20px_rgba(139,92,246,0.2)]"
        onClick={() => onStart(name)}
      >
        Deploy Simulation
      </button>
    </div>
  );
};

export default ModelCard;

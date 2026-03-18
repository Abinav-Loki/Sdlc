import React, { useState } from 'react';

const ModelWizard = ({ onSelectModel, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    clarity: '',
    budget: '',
    involvement: ''
  });

  const questions = [
    {
      id: 'clarity',
      question: "How clear are the project requirements?",
      options: [
        { label: "Fully Fixed & Clear", value: "fixed", icon: "💎" },
        { label: "Evolving / Unclear", value: "flexible", icon: "🌊" }
      ]
    },
    {
      id: 'budget',
      question: "What is your budget approach?",
      options: [
        { label: "Strict / Fixed Budget", value: "fixed", icon: "💰" },
        { label: "Flexible / Pay-as-you-go", value: "flexible", icon: "🏦" }
      ]
    },
    {
      id: 'involvement',
      question: "How involved will stakeholders be?",
      options: [
        { label: "Limited / Sign-off only", value: "low", icon: "📑" },
        { label: "Constant / Daily feedback", value: "high", icon: "🤝" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [questions[step - 1].id]: value }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  const getRecommendation = () => {
    const { clarity, budget, involvement } = answers;
    
    if (clarity === 'fixed' && budget === 'fixed' && involvement === 'low') return 'Waterfall';
    if (clarity === 'flexible' && involvement === 'high') return 'Agile';
    if (clarity === 'flexible' && budget === 'fixed') return 'Iterative';
    if (clarity === 'fixed' && involvement === 'high') return 'V-Model';
    
    return 'Agile'; // Default recommendation
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="glass-card max-w-lg w-full p-10 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavender to-transparent opacity-50" />
        
        <div className="absolute top-6 left-6 flex gap-4">
          <button onClick={handleBack} className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
        
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {step <= questions.length ? (
          <div className="text-center animate-in slide-in-from-right-8 duration-500">
            <span className="text-[10px] font-black text-lavender uppercase tracking-[0.3em] block mb-4">Wizard Step {step} of 3</span>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
              {questions[step - 1].question}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {questions[step - 1].options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="bg-white/5 border border-white/10 hover:border-lavender/50 hover:bg-lavender/5 p-6 rounded-2xl flex items-center gap-4 transition-all group/btn"
                >
                  <span className="text-2xl grayscale group-hover/btn:grayscale-0 transition-all">{opt.icon}</span>
                  <span className="text-white font-bold text-sm uppercase tracking-widest">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in-95 duration-700">
            <div className="w-20 h-20 bg-lavender/20 text-lavender rounded-3xl flex items-center justify-center mx-auto mb-6 border border-lavender/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] block mb-2">Analysis Complete</span>
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Recommended Model: <br/><span className="text-lavender underline decoration-lavender/30 underline-offset-8">{recommendation}</span></h3>
            
            <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">
              Based on your project parameters, the <strong>{recommendation}</strong> methodology provides the optimal balance of speed, risk management, and flexibility.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => onSelectModel(recommendation)}
                className="btn-primary py-4"
              >
                Start {recommendation} Simulation
              </button>
              <button 
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
              >
                Restart Wizard
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center gap-2">
          {[1,2,3].map(i => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-lavender w-8' : 'bg-white/10 w-4'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelWizard;

import React, { useState } from 'react';
import { SDLC_MODELS } from '../constants/models';

const ComparisonPage = ({ onBack }) => {
  const [selectedModels, setSelectedModels] = useState(['Waterfall', 'Agile']);

  const toggleModel = (name) => {
    setSelectedModels(prev => {
      if (prev.includes(name)) {
        if (prev.length <= 1) return prev;
        return prev.filter(m => m !== name);
      }
      if (prev.length >= 4) return prev;
      return [...prev, name];
    });
  };

  const metricsFields = [
    { label: 'Process Type', key: 'workflowType' },
    { label: 'Flexibility', key: 'flexibility' },
    { label: 'Testing Approach', key: 'testing' },
    { label: 'Risk Level', key: 'risk' },
    { label: 'Time Taken', key: 'time' },
    { label: 'Development Cost', key: 'cost' },
    { label: 'Customer Involvement', key: 'involvement' },
    { label: 'Best Suited For', key: 'bestFor' },
  ];

  const compareList = SDLC_MODELS.filter(m => selectedModels.includes(m.name));

  return (
    <div className="page-enter flex flex-col items-center py-12 px-4 max-w-7xl mx-auto">
      <header className="text-center mb-12">
        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-none">Dynamic Benchmarking</h2>
        <p className="text-slate-400 text-lg uppercase font-bold tracking-widest text-xs">Side-by-side analysis of SDLC methodologies</p>
      </header>

      {/* Model Selector Card */}
      <div className="glass-card p-6 mb-12 w-full max-w-4xl text-center">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4 italic">Select up to 4 methodologies to compare</span>
        <div className="flex flex-wrap justify-center gap-3">
          {SDLC_MODELS.map(model => (
            <button
              key={model.name}
              onClick={() => toggleModel(model.name)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${selectedModels.includes(model.name) 
                  ? 'bg-lavender text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-105' 
                  : 'bg-white/5 text-slate-500 border border-white/5 hover:border-white/20'}`}
            >
              {model.name}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card w-full overflow-x-auto shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="p-8 text-lavender text-[10px] uppercase font-black tracking-[0.3em] border-b border-white/5">Comparison Metric</th>
              {compareList.map(m => (
                <th key={m.name} className="p-8 text-white uppercase font-black text-lg tracking-tighter border-b border-white/5 min-w-[200px]">
                  {m.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metricsFields.map((metric, idx) => (
              <tr key={metric.label} className="group hover:bg-white/[0.01] transition-colors">
                <td className="p-8 border-b border-white/5 bg-white/[0.01]">
                  <span className="text-white font-black text-xs uppercase tracking-widest">{metric.label}</span>
                </td>
                {compareList.map(m => (
                  <td key={m.name} className="p-8 border-b border-white/5">
                    <span className="text-slate-400 text-sm leading-relaxed font-medium">
                      {m.metrics[metric.key] || m[metric.key]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={onBack} className="mt-12 btn-secondary px-12 py-4">
        Back to Simulator
      </button>
    </div>
  );
};

export default ComparisonPage;

import React, { useState } from 'react'
import ModelCard from './components/ModelCard'
import SimulationPage from './components/SimulationPage'
import ComparisonPage from './components/ComparisonPage'
import ModelWizard from './components/ModelWizard'
import { SDLC_MODELS } from './constants/models'

function App() {
  const [view, setView] = useState('home'); // 'home', 'simulation', 'comparison'
  const [selectedModel, setSelectedModel] = useState(null);
  const [showWizard, setShowWizard] = useState(false);

  const startSimulation = (model) => {
    setSelectedModel(model);
    setView('simulation');
    setShowWizard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goHome = () => {
    setView('home');
    setSelectedModel(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goComparison = () => {
    setView('comparison');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-16 text-center animate-in fade-in slide-in-from-top duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gradient">
          SDLC Simulator
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Experience the software development lifecycle through interactive, high-fidelity simulations.
        </p>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={goHome}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border 
              ${view === 'home' 
                ? 'bg-lavender text-white border-lavender shadow-lg shadow-lavender/20' 
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
          >
            All Models
          </button>
          <button 
            onClick={goComparison}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border 
              ${view === 'comparison' 
                ? 'bg-lavender text-white border-lavender shadow-lg shadow-lavender/20' 
                : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}
          >
            Comparison Matrix
          </button>
          <button 
            onClick={() => setShowWizard(true)}
            className="px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border border-white/10 text-lavender hover:bg-lavender/10 hover:border-lavender/30"
          >
            Model Selection Wizard
          </button>
        </div>
      </header>

      <main>
        {view === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SDLC_MODELS.map((model, index) => (
              <div 
                key={model.name} 
                className="animate-in fade-in slide-in-from-bottom duration-500 fill-mode-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ModelCard 
                  {...model} 
                  onStart={() => startSimulation(model)}
                />
              </div>
            ))}
          </div>
        )}

        {view === 'simulation' && selectedModel && (
          <SimulationPage 
            model={selectedModel} 
            onBack={goHome}
          />
        )}

        {view === 'comparison' && (
          <ComparisonPage onBack={goHome} />
        )}
      </main>

      {showWizard && (
        <ModelWizard 
          onSelectModel={(modelName) => {
            const m = SDLC_MODELS.find(x => x.name === modelName);
            startSimulation(m);
          }} 
          onClose={() => setShowWizard(false)} 
        />
      )}

      <footer className="mt-20 text-center text-slate-600 border-t border-white/5 pt-8 pb-12">
        <p className="text-sm font-medium">© 2026 SDLC Simulator. Designed for Excellence.</p>
      </footer>
    </div>
  )
}

export default App

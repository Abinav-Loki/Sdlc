import React, { useState, useEffect, useRef } from 'react';

const SimulationPage = ({ model, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [activityLog, setActivityLog] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInitiation, setShowInitiation] = useState(true);
  const [projectParams, setProjectParams] = useState({
    name: "New System",
    complexity: "Medium",
    budget: 50000
  });
  const [liveMetrics, setLiveMetrics] = useState({
    time: 0,
    cost: 0
  });
  const [currentTrivia, setCurrentTrivia] = useState("");
  const [showTooltip, setShowTooltip] = useState(null);

  const trivia = [
    "Did you know? The Waterfall model was first described by Winston W. Royce in 1970.",
    "Agile focuses on 'People and Interactions' over 'Processes and Tools'.",
    "The Spiral model is highly effective for large-scale, high-risk projects.",
    "V-Model stands for 'Verification and Validation' model.",
    "RAD (Rapid Application Development) was inspired by Barry Boehm and James Martin.",
    "Prototyping helps uncover hidden requirements early in the lifecycle.",
    "In Agile, a 'Sprint' is usually a 2-4 week development cycle.",
    "The 'Big Bang' model is most common in very small or academic projects."
  ];
  
  const logEndRef = useRef(null);
  
  const steps = model.steps || [];
  const totalSteps = steps.length;

  const handleRestart = () => {
    setCurrentStep(0);
    setActivityLog([{
      text: `Simulation for ${model.name} restarted.`,
      type: 'info',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    }]);
    setTestReport(null);
    setLiveMetrics({ time: 0, cost: 0 });
    setIsProcessing(false);
  };

  const [testReport, setTestReport] = useState(null);
  
  // Feasibility logic
  const getFeasibility = () => {
    const { complexity } = projectParams;
    const modelName = model.name;
    
    if (complexity === 'High' && (modelName === 'Waterfall' || modelName === 'Big Bang')) {
      return { status: 'Warning', text: `${modelName} may struggle with high complexity due to rigid structures or lack of planning.` };
    }
    if (complexity === 'Low' && (modelName === 'Spiral' || modelName === 'V-Model')) {
      return { status: 'Caution', text: `${modelName} might be overkill for a low complexity project.` };
    }
    return { status: 'Recommended', text: `${modelName} is well-suited for a project of this complexity.` };
  };

  // Workflow Visualization Component
  const WorkflowVisual = ({ type, current, total }) => {
    const progress = (current / total) * 100;
    
    if (type === 'v-shape') {
      return (
        <svg viewBox="0 0 400 200" className="w-64 h-32 mx-auto mb-8 opacity-50">
          <path d="M50,50 L200,150 L350,50" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-700" />
          <path d="M50,50 L200,150 L350,50" fill="none" stroke="currentColor" strokeWidth="4" 
            className="text-lavender transition-all duration-1000" 
            style={{ strokeDasharray: 450, strokeDashoffset: 450 - (4.5 * progress) }} 
          />
        </svg>
      );
    }
    if (type === 'iterative' || type === 'spiral') {
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto mb-8 opacity-50 animate-spin-slow">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-700" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="4" 
            className="text-lavender transition-all duration-1000" 
            style={{ strokeDasharray: 502, strokeDashoffset: 502 - (5.02 * progress) }} 
          />
        </svg>
      );
    }
    return (
      <div className="h-1 bg-slate-800 w-64 mx-auto rounded-full mb-12 relative overflow-hidden">
        <div className="h-full bg-lavender transition-all duration-1000" style={{ width: `${progress}%` }} />
      </div>
    );
  };

  const generateTestReport = () => {
    const total = Math.floor(Math.random() * 10) + 15;
    const failed = Math.floor(Math.random() * 3);
    const passed = total - failed;
    const bugs = [
      "Memory leak in data parser",
      "UI alignment in mobile view",
      "API timeout on large payloads",
      "Null pointer in user session"
    ].sort(() => 0.5 - Math.random()).slice(0, failed);

    return { total, passed, failed, bugs };
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps && !isProcessing) {
      setIsProcessing(true);
      setCurrentTrivia(trivia[Math.floor(Math.random() * trivia.length)]);
      
      // Simulate processing time
      setTimeout(() => {
        const completedStepName = steps[currentStep];
        const nextStepIndex = currentStep + 1;
        
        // Update Live Metrics
        const baseCostPerStep = projectParams.budget / totalSteps;
        const complexityMultiplier = projectParams.complexity === 'High' ? 1.5 : projectParams.complexity === 'Low' ? 0.8 : 1.0;
        
        setLiveMetrics(prev => ({
          time: prev.time + (10 + Math.floor(Math.random() * 20)), // 10-30 days
          cost: Math.round(prev.cost + (baseCostPerStep * complexityMultiplier))
        }));

        // Generate testing sub-logs if it's a testing phase
        const isTestingStep = ["test", "valida", "evaluat", "review"].some(keyword => 
          completedStepName.toLowerCase().includes(keyword)
        );

        if (isTestingStep) {
          const report = generateTestReport();
          setTestReport(report);
          
          setActivityLog(prev => [
            ...prev,
            { text: "Executing Unit Testing phase...", type: 'info', time: "System" },
            { text: "Performing Integration Testing...", type: 'info', time: "System" },
            { text: "System Verification sequence active...", type: 'info', time: "System" },
            { 
              text: `Quality Gate: ${report.passed}/${report.total} modules passed. ${report.failed} bugs identified.`, 
              type: 'success', 
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) 
            }
          ]);
        }

        setCurrentStep(nextStepIndex);
        setIsProcessing(false);
        
        if (!isTestingStep) {
          setActivityLog(prev => [...prev, {
            text: `${completedStepName} phase completed successfully.`,
            type: 'success',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
          }]);
        }
      }, 2000);
    }
  };

  const isAllCompleted = currentStep === totalSteps;
  const progressPercentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  // Initiation Modal
  if (showInitiation) {
    const feasibility = getFeasibility();
    return (
      <div className="page-enter flex flex-col items-center justify-center py-12 px-4">
        <div className="glass-card p-10 max-w-2xl w-full">
          <header className="mb-8 text-center">
            <div className="h-12 w-12 bg-lavender/20 text-lavender rounded-xl flex items-center justify-center mx-auto mb-4 border border-lavender/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Module 1: Project Initiation</h2>
            <p className="text-slate-400 mt-2">Configure simulation parameters for <span className="text-lavender font-bold">{model.name}</span></p>
          </header>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Project Enterprise Name</label>
              <input 
                type="text" 
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lavender/50 outline-none transition-all"
                value={projectParams.name}
                onChange={(e) => setProjectParams({...projectParams, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">System Complexity</label>
                <select 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lavender/50 outline-none transition-all"
                  value={projectParams.complexity}
                  onChange={(e) => setProjectParams({...projectParams, complexity: e.target.value})}
                >
                  <option value="Low">Low (MVP/Small Site)</option>
                  <option value="Medium">Medium (Corporate App)</option>
                  <option value="High">High (Enterprise/Safe)</option>
                </select>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Initial Budget ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-lavender/50 outline-none transition-all"
                  value={projectParams.budget}
                  onChange={(e) => setProjectParams({...projectParams, budget: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-start gap-4 text-left transition-all
              ${feasibility.status === 'Recommended' ? 'bg-green-500/5 border-green-500/20 text-green-400' : 
                feasibility.status === 'Warning' ? 'bg-red-500/5 border-red-500/20 text-red-400' : 
                'bg-yellow-500/5 border-yellow-500/20 text-yellow-400'}`}>
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">{feasibility.status} Feasibility</p>
                <p className="text-sm font-medium">{feasibility.text}</p>
              </div>
            </div>
            
            <div className="pt-4 flex gap-4">
              <button onClick={() => setShowInitiation(false)} className="btn-primary flex-1 py-4">
                Deploy Project Simulation
              </button>
              <button onClick={onBack} className="btn-secondary px-8">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isAllCompleted && !isProcessing) {
    return (
      <div className="page-enter flex flex-col items-center justify-center py-12">
        <div className="glass-card p-12 max-w-4xl w-full text-center hover:translate-y-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
          </div>

          <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-2 uppercase tracking-tighter">Project Closure Report</h2>
          <p className="text-slate-400 text-lg mb-10 italic">Official simulation summary for <span className="text-white font-bold">{projectParams.name}</span> using <span className="text-lavender font-bold">{model.name}</span>.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
              <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Final Metrics</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Duration</span>
                  <span className="text-white font-bold">{liveMetrics.time} Days</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Expenditure</span>
                  <span className="text-white font-bold">${liveMetrics.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Efficiency</span>
                  <span className="text-white font-bold">{projectParams.complexity === 'High' ? 'Optimal' : 'Standard'}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 md:col-span-2">
              <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">Validation Outcomes</h4>
              {testReport ? (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-end gap-3 mb-4">
                      <span className="text-5xl font-black text-green-500">{Math.round((testReport.passed / testReport.total) * 100)}%</span>
                      <span className="text-xs text-slate-500 mb-2 uppercase font-bold">Pass Rate</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      All critical modules passed. {testReport.failed} non-blocking issues documented for maintenance.
                    </p>
                  </div>
                  <div className="flex-1 border-l border-white/5 pl-8">
                    <span className="text-[10px] text-slate-500 uppercase font-black block mb-3">Defect Log</span>
                    <ul className="space-y-2">
                      {testReport.bugs.map((bug, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 bg-red-500 rounded-full" /> {bug}
                        </li>
                      ))}
                      {testReport.bugs.length === 0 && <li className="text-xs text-green-400">No major bugs found.</li>}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 text-sm italic">Verification completed through standard deployment channels.</p>
              )}
            </div>
          </div>

          <div className="bg-lavender/5 p-8 rounded-3xl border border-lavender/10 mb-12 text-left">
            <h4 className="text-lavender text-[10px] font-black uppercase tracking-[0.3em] mb-4">Strategic Conclusion</h4>
            <p className="text-slate-200 text-sm leading-relaxed">
              Based on the <strong>{model.name}</strong> methodology, this project achieved stability through 
              {model.workflowType === 'iterative' ? " continuous feedback loops and incremental releases." : 
               model.workflowType === 'spiral' ? " exhaustive risk management and iterative prototyping." :
               model.workflowType === 'v-shape' ? " rigorous validation at every stage of the design process." :
               " a structured, well-defined sequence of phase-gate execution."} 
              The outcome demonstrates a <span className="text-white font-bold">{model.metrics?.risk === 'High' ? 'calculated risk' : 'balanced'}</span> approach to delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handleRestart} className="btn-primary">
              Run New Simulation
            </button>
            <button onClick={onBack} className="btn-secondary">
              Exit Simulator
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter flex flex-col items-center justify-center">
      <div className="glass-card p-12 max-w-5xl w-full text-center hover:translate-y-0">
        <header className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-lavender/10 rounded-2xl flex items-center justify-center border border-lavender/20">
                <svg className="w-6 h-6 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-black uppercase text-sm tracking-tighter">{projectParams.name}</h3>
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-none mt-1">Active Lifecycle: {model.name}</p>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Estimated Cost</span>
                <span className="text-xl font-black text-white leading-none">${liveMetrics.cost.toLocaleString()}</span>
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Time Elapsed</span>
                <span className="text-xl font-black text-white leading-none">{liveMetrics.time} Days</span>
              </div>
            </div>
          </div>

          <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
            Stage {currentStep + 1}: <span className="text-lavender">{steps[currentStep] || "Deploying"}</span>
          </h2>
          
          <WorkflowVisual type={model.workflowType} current={currentStep} total={totalSteps} />
        </header>

        {/* Progress Bar Container */}
        <div className="w-full mb-12 flex items-center gap-4 px-4 max-w-3xl mx-auto">
          <div className="flex-grow h-4 bg-zinc-700/50 rounded-full overflow-hidden border border-white/5 relative">
            <div 
              className="h-full bg-lavender transition-all duration-700 ease-out shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="text-lavender font-bold min-w-[3rem] text-right">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        
        {/* Progress Flow */}
        <div className="w-full mb-16 relative px-4">
          <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-10 flex-1">
                  <div 
                    onMouseEnter={() => setShowTooltip(index)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 cursor-help relative
                      ${index < currentStep 
                        ? "bg-green-500/20 border-green-500 text-green-500" 
                        : index === currentStep 
                          ? "bg-lavender/20 border-lavender text-lavender shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-110" 
                          : "bg-slate-800/50 border-slate-700 text-slate-500"}`}
                  >
                    {index < currentStep ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs md:text-sm font-bold">{index + 1}</span>
                    )}

                    {/* Educational Tooltip */}
                    {showTooltip === index && (
                      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-48 bg-slate-900 border border-lavender/30 p-3 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 pointer-events-none">
                        <p className="text-[10px] text-lavender font-black uppercase mb-1 tracking-widest">{step}</p>
                        <p className="text-[11px] text-slate-300 leading-tight">
                          {model.stepDetails ? model.stepDetails[index] : "Analyzing phase objectives and requirements."}
                        </p>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-lavender/30 rotate-45"></div>
                      </div>
                    )}
                  </div>
                  <p className={`mt-4 text-[10px] md:text-xs font-bold text-center absolute -bottom-10 w-24 md:w-28 line-clamp-2
                    ${index <= currentStep ? "text-slate-200" : "text-slate-500"}`}>
                    {step}
                  </p>
                </div>

                {/* Connector Line */}
                {index < totalSteps - 1 && (
                  <div className="flex-grow h-[2px] relative top-[-20px] md:top-[-24px] min-w-[10px]">
                    <div className={`h-full transition-all duration-700 ${index < currentStep ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-slate-800"}`}></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-16 mb-12">
          <p className="text-slate-400 text-lg leading-relaxed mb-8 h-20 flex items-center justify-center">
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2">
                <span className="flex items-center gap-3 animate-pulse">
                  <svg className="animate-spin h-5 w-5 text-lavender" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Execution In Progress: {steps[currentStep]}...
                </span>
                <div className="mt-4 px-6 py-2 bg-lavender/5 border border-lavender/10 rounded-full animate-in fade-in slide-in-from-top-2">
                  <p className="text-[10px] text-lavender font-black uppercase tracking-widest mb-1 italic opacity-70">Education Tip:</p>
                  <p className="text-xs text-slate-400 italic">"{currentTrivia}"</p>
                </div>
              </div>
            ) : (
              `Model Status: ${steps[currentStep] || "Maintenance"} Phase Ready.`
            )}
          </p>

          <button 
            onClick={handleNextStep}
            disabled={isAllCompleted || isProcessing}
            className={`btn-primary px-10 py-4 text-lg min-w-[240px] shadow-2xl
              ${isProcessing ? "bg-lavender/40 cursor-wait" : ""}`}
          >
            {isProcessing ? "Processing..." : "Complete Phase"}
          </button>
        </div>

        {/* Activity Log Section */}
        <div className="mt-12 text-left max-w-3xl mx-auto">
          <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 px-2">System Activity Log</h3>
          <div className="bg-[#1a1a2e] rounded-3xl p-8 border border-white/5 h-56 overflow-y-auto custom-scrollbar shadow-inner">
            <div className="space-y-6">
              {activityLog.map((log, i) => (
                <div key={i} className="flex items-start gap-4 animate-in slide-in-from-left duration-500">
                  <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg 
                    ${log.type === 'success' ? 'bg-green-500/20 text-green-500 shadow-green-500/10' : 'bg-lavender/20 text-lavender shadow-lavender/10'}`}>
                    {log.type === 'success' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-[10px] font-black">!</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-slate-200 text-sm leading-relaxed font-medium">{log.text}</p>
                    <span className="text-slate-600 text-[9px] uppercase font-black tracking-widest">{log.time}</span>
                  </div>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="btn-secondary mt-12 mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Abort Simulation
        </button>
      </div>
    </div>
  );
};

export default SimulationPage;

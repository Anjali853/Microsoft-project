
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Leaf, 
  Bell, 
  Mic, 
  Zap,
  ShieldCheck,
  Trophy
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import EcoScore from './components/EcoScore';
import Alerts from './components/Alerts';
import PitchDeck from './components/PitchDeck';
import VoiceAssistant from './components/VoiceAssistant';
import { INITIAL_STATE } from './constants';
import { AppState } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'eco' | 'alerts' | 'pitch' | 'voice'>('dashboard');
  const [appState, setAppState] = useState<AppState>(INITIAL_STATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setAppState(prev => ({
        ...prev,
        currentUsage: +(prev.currentUsage + (Math.random() * 0.2 - 0.1)).toFixed(2)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'analytics', label: 'Insights', icon: BarChart3 },
    { id: 'voice', label: 'Assistant', icon: Mic },
    { id: 'eco', label: 'Impact', icon: Trophy },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'pitch', label: 'System', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0B0F14] overflow-hidden">
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-[#2DFF8E]/10 p-2 rounded-xl border border-[#2DFF8E]/20">
            <Zap className="text-[#2DFF8E] w-5 h-5 shadow-[0_0_10px_#2DFF8E]" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tighter font-tech uppercase">EcoSmart</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Estimated Bill</span>
            <span className="text-sm font-black text-white tracking-tight">₹{appState.predictedBill}</span>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#2DFF8E] font-bold text-sm">
            JD
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar pb-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {activeTab === 'dashboard' && <Dashboard state={appState} />}
          {activeTab === 'analytics' && <Analytics state={appState} />}
          {activeTab === 'voice' && <VoiceAssistant state={appState} />}
          {activeTab === 'eco' && <EcoScore state={appState} />}
          {activeTab === 'alerts' && <Alerts state={appState} />}
          {activeTab === 'pitch' && <PitchDeck />}
        </div>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-30">
        <nav className="glass-dark p-2 rounded-3xl flex justify-between items-center shadow-2xl shadow-black">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-[#2DFF8E]/10 text-[#2DFF8E]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_#2DFF8E]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-[#2DFF8E] rounded-full shadow-[0_0_5px_#2DFF8E]"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default App;

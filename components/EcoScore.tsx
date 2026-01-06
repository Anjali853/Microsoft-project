
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Trophy, Users, ChevronRight, ShieldCheck, TrendingDown, Timer, Flame, Coins, Leaf
} from 'lucide-react';
import { AppState, Recommendation } from '../types';
import { getSmartRecommendations } from '../services/geminiService';

const EcoScore: React.FC<{ state: AppState }> = ({ state }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      setLoading(true);
      const tips = await getSmartRecommendations(state);
      setRecommendations(tips);
      setLoading(false);
    };
    fetchTips();
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. MASTER SCORE & COMMUNITY */}
      <div className="bg-gradient-to-br from-[#121B26] to-[#0B0F14] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#2AA8FF]/10 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="space-y-6 flex-1">
            <div>
              <span className="text-[10px] font-black text-[#2AA8FF] uppercase tracking-[0.3em] mb-2 block">Neighborhood Rank</span>
              <h2 className="text-4xl font-black text-white font-tech leading-none">ELITE SAVER</h2>
              <p className="text-slate-400 mt-3 text-sm max-w-sm">"You consume <span className="text-[#2DFF8E] font-bold">18% less energy</span> than average homes in Indiranagar. This is equivalent to planting 12 trees."</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <StatBox icon={Coins} value={`₹${state.co2Saved * 120}`} label="Saved Annually" color="text-[#2DFF8E]" />
              <StatBox icon={Leaf} value={`${state.co2Saved}kg`} label="CO₂ Offset" color="text-[#2AA8FF]" />
            </div>
          </div>

          <div className="w-px h-32 bg-white/5 hidden md:block"></div>

          <div className="text-center space-y-4">
            <div className="text-5xl font-black text-white font-tech drop-shadow-[0_0_15px_rgba(45,255,142,0.4)]">
              {state.ecoScore}
              <span className="text-xl text-slate-600 ml-1">/100</span>
            </div>
            <div className="bg-[#2DFF8E]/10 border border-[#2DFF8E]/20 px-4 py-1 rounded-full text-[10px] font-black text-[#2DFF8E] uppercase tracking-widest">
              Top 5% Globally
            </div>
          </div>
        </div>
      </div>

      {/* 2. CHALLENGES & GAMIFICATION */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Active Quests
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.challenges.map(c => (
            <div key={c.id} className="glass-dark rounded-3xl p-6 border border-white/5 hover:border-[#2AA8FF]/30 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-white text-base">{c.title}</h4>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Exp: {c.deadline}</p>
                </div>
                <div className="bg-[#2AA8FF]/10 text-[#2AA8FF] px-3 py-1 rounded-xl text-[10px] font-black border border-[#2AA8FF]/20 shadow-[0_0_10px_rgba(42,168,255,0.2)]">
                  {c.reward}
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2AA8FF] to-[#2DFF8E] animate-pulse" style={{ width: `${c.progress}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                  <span>{c.progress}% done</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. AI COACHING CARDS */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#2DFF8E]" />
          Smart Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading ? [1,2,3].map(i => <div key={i} className="h-40 glass rounded-3xl animate-pulse" />) :
            recommendations.map((rec, i) => (
              <div key={i} className="glass-dark p-6 rounded-3xl border border-white/5 hover:border-[#2DFF8E]/20 transition-all cursor-pointer group">
                <div className="bg-[#2DFF8E]/5 p-2 w-fit rounded-xl mb-4 text-[#2DFF8E] border border-[#2DFF8E]/10">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white mb-2 leading-tight group-hover:text-[#2DFF8E] transition-colors">{rec.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{rec.description}</p>
                <div className="text-[10px] font-black text-[#2DFF8E] uppercase tracking-widest bg-[#2DFF8E]/10 w-fit px-2 py-1 rounded-md">
                  Save {rec.impact}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon: Icon, value, label, color }: any) => (
  <div className="flex items-center gap-3">
    <div className={`p-2 bg-white/5 rounded-xl border border-white/5 ${color}`}><Icon className="w-5 h-5" /></div>
    <div>
      <div className="text-lg font-black text-white">{value}</div>
      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

export default EcoScore;

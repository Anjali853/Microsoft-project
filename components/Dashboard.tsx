
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Zap, ArrowRight, Activity, Flame, Clock, Sparkles, Leaf, TrendingUp, AlertCircle, Coins
} from 'lucide-react';
import { AppState } from '../types';

const Dashboard: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DFF8E]/5 blur-[100px] pointer-events-none"></div>
          
          <div className="relative w-40 h-40 shrink-0">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="transparent" />
              <circle 
                cx="80" cy="80" r="70" 
                stroke="#2DFF8E" 
                strokeWidth="12" 
                fill="transparent" 
                strokeDasharray={440} 
                strokeDashoffset={440 - (440 * state.ecoScore) / 100}
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_#2DFF8E]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white font-tech">{state.ecoScore}</span>
              <span className="text-[10px] font-bold text-[#2DFF8E] uppercase tracking-widest">Eco Index</span>
            </div>
          </div>

          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white font-jakarta leading-tight">Optimizing home <span className="text-[#2DFF8E]">efficiency</span> today.</h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <ImpactBadge icon={Coins} value={`₹${(state.co2Saved * 12).toFixed(0)}`} label="Saved Today" color="text-[#2DFF8E]" />
              <ImpactBadge icon={Leaf} value={`${state.co2Saved}kg`} label="CO₂ Offset" color="text-[#2AA8FF]" />
            </div>
          </div>
        </div>

        <div className="glass bg-rose-500/10 border-rose-500/20 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden">
           <div className="space-y-2">
             <div className="flex items-center justify-between">
               <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Inefficiency Detected</span>
               <AlertCircle className="w-5 h-5 text-rose-500" />
             </div>
             <h3 className="text-xl font-bold text-white">HVAC Alert</h3>
             <p className="text-sm text-slate-400">External thermal leak detected in Living Room. Estimated loss: ₹12/hr.</p>
           </div>
           <button className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-rose-500/30">
             Resolve Issue
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-dark border-[#2AA8FF]/20 rounded-[2rem] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#2AA8FF]" />
              Usage Forecast
            </h3>
            <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-slate-400">24H Trend</span>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-500">Predicted daily cost increase</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">+₹{state.predictedIncrease}</span>
              <span className="text-xs font-bold text-rose-500">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="glass-dark border-[#2DFF8E]/20 rounded-[2rem] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#2DFF8E]" />
              Savings Objective
            </h3>
            <span className="text-[10px] font-black bg-[#2DFF8E]/10 px-2 py-1 rounded text-[#2DFF8E]">In Progress</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Peak hour reduction</span>
              <span className="text-[#2DFF8E]">80% Efficiency</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2AA8FF] to-[#2DFF8E]" style={{ width: '80%' }}></div>
            </div>
            <p className="text-xs text-slate-500">Reward: Tier 2 Efficiency Badge</p>
          </div>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white font-tech uppercase tracking-tight">Consumption Patterns</h3>
            <p className="text-sm text-slate-500">Live vs Predicted</p>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.readings}>
              <defs>
                <linearGradient id="neonFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DFF8E" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#2DFF8E" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="timestamp" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}
                itemStyle={{ color: '#2DFF8E' }}
              />
              <Area 
                type="monotone" 
                dataKey="usage" 
                stroke="#2DFF8E" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#neonFill)" 
                animationDuration={2000}
                className="drop-shadow-[0_0_8px_rgba(45,255,142,0.5)]"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const ImpactBadge = ({ icon: Icon, value, label, color }: any) => (
  <div className="glass-dark px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/5">
    <Icon className={`w-5 h-5 ${color}`} />
    <div>
      <div className="text-lg font-black text-white">{value}</div>
      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
    </div>
  </div>
);

export default Dashboard;

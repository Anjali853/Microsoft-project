
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Zap, 
  Wind, 
  Refrigerator, 
  Tv, 
  Lightbulb,
  WashingMachine,
  AlertTriangle,
  Info
} from 'lucide-react';
import { AppState } from '../types';

const Analytics: React.FC<{ state: AppState }> = ({ state }) => {
  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'air conditioner': return Wind;
      case 'refrigerator': return Refrigerator;
      case 'washing machine': return WashingMachine;
      case 'lighting': return Lightbulb;
      case 'entertainment': return Tv;
      default: return Zap;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-tech uppercase">Device Analytics</h2>
          <p className="text-slate-500">Resource distribution per appliance</p>
        </div>
        <div className="glass-dark px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Daily Total</span>
          <span className="font-black text-[#2DFF8E]">27.0 kWh</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-[2rem] p-8 border border-white/5">
          <h3 className="font-bold text-white mb-8 flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#2AA8FF]" />
            Consumption Share
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={state.appliances} layout="vertical" margin={{ left: 40, right: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0B0F14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Bar dataKey="percentage" radius={[0, 8, 8, 0]} barSize={16}>
                  {state.appliances.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.status === 'inefficient' ? '#f43f5e' : '#2DFF8E'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-rose-500/5 border border-rose-500/20 p-8 rounded-[2rem] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-500 mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Inefficiency Warning</span>
            </div>
            <h3 className="text-2xl font-black text-white font-tech">HVAC UNIT</h3>
            <p className="text-slate-400 mt-4 text-sm leading-relaxed">
              Consumption is 24% above the baseline for this model. Recommend immediate condenser coil cleaning or refrigerant check to prevent critical failure.
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between p-5 glass-dark rounded-2xl border border-white/5">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Impact</span>
              <span className="text-xl font-black text-white">₹840 / mo</span>
            </div>
            <button className="bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-rose-600 transition-all shadow-xl shadow-rose-500/20">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>

      <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/2">
          <h3 className="font-bold text-white font-tech uppercase tracking-tight">Device Status</h3>
          <Info className="w-4 h-4 text-slate-600" />
        </div>
        <div className="divide-y divide-white/5">
          {state.appliances.map((app) => {
            const Icon = getIcon(app.name);
            return (
              <div key={app.name} className="p-5 flex items-center gap-4 hover:bg-white/2 transition-colors">
                <div className={`p-3 rounded-2xl ${app.status === 'optimal' ? 'bg-[#2DFF8E]/10 text-[#2DFF8E]' : 'bg-rose-500/10 text-rose-500'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white">{app.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                      app.status === 'optimal' 
                      ? 'bg-[#2DFF8E]/20 text-[#2DFF8E]' 
                      : 'bg-rose-500/20 text-rose-500'
                    }`}>
                      {app.status}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">• Online</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-white tracking-tight">{app.usage} kWh</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">Today</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;

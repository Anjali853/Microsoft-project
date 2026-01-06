
import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Trash2,
  Settings
} from 'lucide-react';
import { AppState } from '../types';

const Alerts: React.FC<{ state: AppState }> = ({ state }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white font-tech uppercase tracking-tight">Notifications</h2>
          <p className="text-slate-500">Proactive energy management logs</p>
        </div>
        <button className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
        {state.alerts.length > 0 ? (
          <div className="divide-y divide-white/5">
            {state.alerts.map((alert) => (
              <div key={alert.id} className="p-8 flex gap-6 hover:bg-white/2 transition-colors relative group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  alert.severity === 'high' ? 'bg-rose-500/20 text-rose-500 border border-rose-500/20' :
                  alert.severity === 'medium' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/20' :
                  'bg-[#2AA8FF]/20 text-[#2AA8FF] border border-[#2AA8FF]/20'
                }`}>
                  {alert.severity === 'high' ? <AlertTriangle className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                </div>
                
                <div className="flex-1 pr-12">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-lg">{alert.title}</h4>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{alert.message}</p>
                  
                  <div className="mt-6 flex items-center gap-4">
                    <button className="text-xs font-black text-[#2DFF8E] px-4 py-2 bg-[#2DFF8E]/10 rounded-xl hover:bg-[#2DFF8E]/20 transition-all uppercase tracking-widest">
                      Resolve
                    </button>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest">
                      Dismiss
                    </button>
                  </div>
                </div>

                <div className="absolute right-6 top-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 text-slate-600 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-24 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-[#2DFF8E]/5 border border-[#2DFF8E]/10 rounded-full flex items-center justify-center mb-8">
              <CheckCircle2 className="w-10 h-10 text-[#2DFF8E]" />
            </div>
            <h3 className="text-2xl font-bold text-white font-tech uppercase tracking-tight">System Status Optimal</h3>
            <p className="text-slate-500 mt-2 max-w-xs">No anomalies detected in your smart home network.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-dark p-8 rounded-[2rem] border border-white/5">
          <h4 className="font-bold text-white mb-6 font-tech uppercase tracking-tight">Automation Triggers</h4>
          <div className="space-y-5">
            <ToggleItem label="Peak load notifications" active={true} />
            <ToggleItem label="Smart device auditing" active={true} />
            <ToggleItem label="Cost anomaly detection" active={true} />
            <ToggleItem label="Eco-goal tracking" active={true} />
          </div>
        </div>
        
        <div className="glass rounded-[2rem] border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center bg-white/2">
          <Bell className="w-12 h-12 text-slate-700 mb-4" />
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-loose">
            AI learning active. Alerts are refined based on household consumption behaviors.
          </p>
        </div>
      </div>
    </div>
  );
};

const ToggleItem = ({ label, active }: { label: string, active: boolean }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-400">{label}</span>
    <div className={`w-12 h-6 rounded-full transition-all relative cursor-pointer ${active ? 'bg-[#2DFF8E]/30' : 'bg-white/10'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)] ${active ? 'right-1 bg-[#2DFF8E]' : 'left-1 bg-slate-600'}`} />
    </div>
  </div>
);

export default Alerts;

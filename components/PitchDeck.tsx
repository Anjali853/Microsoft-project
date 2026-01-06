
import React from 'react';
import { 
  CheckCircle2, Zap, Cpu, ShieldCheck, Smartphone, Users, Globe, BarChart
} from 'lucide-react';

const SystemOverview: React.FC = () => {
  return (
    <div className="space-y-12 pb-20">
      <section className="text-center space-y-4 py-6">
        <h2 className="text-4xl font-black text-white font-tech uppercase tracking-tight">EcoSmart Architecture</h2>
        <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
          A proactive energy management platform utilizing predictive modeling to optimize household consumption.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ValueCard 
          icon={Cpu} 
          title="Predictive AI" 
          desc="Continuous monitoring of consumption patterns to forecast cost fluctuations." 
        />
        <ValueCard 
          icon={Smartphone} 
          title="Hardware Agnostic" 
          desc="Integration support for digital bills, appliance inputs, and smart-meter APIs." 
        />
        <ValueCard 
          icon={Users} 
          title="Incentive System" 
          desc="Data-driven behavioral nudges to encourage sustainable energy habits." 
        />
      </div>

      <div className="glass-dark border border-white/5 p-10 rounded-[3rem] space-y-8 relative overflow-hidden">
        <h3 className="text-2xl font-bold font-jakarta text-white relative z-10">System Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <FeatureItem text="Appliance-level profiling and efficiency auditing." />
          <FeatureItem text="Real-time thermal leak and wastage detection." />
          <FeatureItem text="Proactive billing alerts and maintenance scheduling." />
          <FeatureItem text="Comparative neighborhood efficiency benchmarks." />
        </div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#2AA8FF]/5 blur-[100px] rounded-full" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricItem icon={BarChart} label="Savings" value="15-25%" />
        <MetricItem icon={Zap} label="Reduced Load" value="1.2kW Avg" />
        <MetricItem icon={ShieldCheck} label="Precision" value="98.4%" />
        <MetricItem icon={Globe} label="CO2 Offset" value="320kg/yr" />
      </div>

      <div className="text-center p-8 border-2 border-dashed border-white/5 rounded-3xl bg-white/5 backdrop-blur-md">
        <h4 className="text-slate-400 font-bold text-sm uppercase mb-4">Platform Roadmap</h4>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#2AA8FF]" /> <span className="text-xs font-bold text-slate-300">Smart Grid Ready</span></div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#2DFF8E]" /> <span className="text-xs font-bold text-slate-300">End-to-End Encryption</span></div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> <span className="text-xs font-bold text-slate-300">Industrial Scalability</span></div>
        </div>
      </div>
    </div>
  );
};

const ValueCard = ({ icon: Icon, title, desc }: any) => (
  <div className="glass-dark p-6 rounded-3xl border border-white/5 space-y-3 transition-colors hover:border-[#2DFF8E]/20">
    <div className="bg-[#2DFF8E]/10 w-10 h-10 rounded-xl flex items-center justify-center text-[#2DFF8E]">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="font-bold text-white">{title}</h4>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-5 h-5 text-[#2DFF8E] shrink-0" />
    <span className="text-sm font-medium text-slate-300">{text}</span>
  </div>
);

const MetricItem = ({ icon: Icon, label, value }: any) => (
  <div className="glass-dark p-4 rounded-2xl text-center border border-white/5">
    <Icon className="w-4 h-4 text-slate-500 mx-auto mb-2" />
    <div className="text-xl font-black text-white">{value}</div>
    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</div>
  </div>
);

export default SystemOverview;

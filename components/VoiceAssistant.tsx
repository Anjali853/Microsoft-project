
import React, { useState } from 'react';
import { Mic, Send, Bot, User, Sparkles, Zap } from 'lucide-react';
import { askEnergyAI } from '../services/geminiService';
import { AppState } from '../types';

const VoiceAssistant: React.FC<{ state: AppState }> = ({ state }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "EcoSmart AI Active. How can I help you optimize your home today? Ask me 'Why is my bill high?'" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    const response = await askEnergyAI(userMsg, state);
    setMessages(prev => [...prev, { role: 'ai', text: response || "Analysis complete: System is stable." }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh] glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
      {/* Header */}
      <div className="p-6 bg-white/5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#2AA8FF]/20 p-2 rounded-2xl border border-[#2AA8FF]/30">
            <Bot className="w-5 h-5 text-[#2AA8FF]" />
          </div>
          <div>
            <h3 className="font-bold text-white font-tech uppercase tracking-tighter">Energy AI</h3>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#2DFF8E] rounded-full animate-pulse shadow-[0_0_5px_#2DFF8E]"></span>
              <span className="text-[9px] text-[#2DFF8E] font-black uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-2xl">
          <Sparkles className="text-amber-400 w-5 h-5" />
        </div>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar bg-black/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg ${
                m.role === 'user' ? 'bg-[#121B26] border border-white/10 text-slate-400' : 'bg-[#2AA8FF] text-white shadow-[#2AA8FF]/20'
              }`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed font-medium ${
                m.role === 'user' 
                ? 'bg-white/10 text-white border border-white/5 rounded-tr-none' 
                : 'bg-white text-slate-900 rounded-tl-none font-bold'
              }`}>
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
             <div className="w-10 h-10 bg-[#2AA8FF]/20 rounded-2xl flex items-center justify-center animate-pulse">
                <Bot className="w-5 h-5 text-[#2AA8FF]" />
             </div>
             <div className="bg-white/5 h-12 w-24 rounded-2xl animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/20 border-t border-white/5 relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="bg-[#2AA8FF]/10 text-[#2AA8FF] p-4 rounded-2xl border border-[#2AA8FF]/20 animate-glow">
              <Mic className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query home data..."
              className="w-full bg-white/5 border border-white/10 rounded-3xl py-4 pl-6 pr-14 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#2AA8FF]/50 transition-all placeholder:text-slate-600"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2AA8FF] text-white p-2.5 rounded-2xl shadow-xl shadow-[#2AA8FF]/20 active:scale-95 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;

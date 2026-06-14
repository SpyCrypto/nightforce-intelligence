import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, Search } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const quickPrompts = [
  'What happened in Midnight this week?',
  'What projects launched recently?',
  'Summarize Edda Labs videos',
  'Explain Compact contracts',
  'Find ecosystem grants',
];

const getMockResponse = (query: string): { content: string; sources: string[] } => {
  const q = query.toLowerCase();
  if (q.includes('week') || q.includes('happened')) {
    return {
      content: `**This week in Midnight:**\n\n🚀 **Testnet v0.8.0** - 40% faster proof generation\n\n📚 **3 New Tutorials** - Compact contracts, privacy patterns, DApp integration\n\n🏆 **Grant Winners** - 12 projects selected for next funding round\n\n👥 **Community Spotlight** - Interview with first Midnight DeFi team`,
      sources: ['Midnight Official Blog', 'Edda Labs Newsletter', 'Community Discord'],
    };
  }
  if (q.includes('project') || q.includes('launch')) {
    return {
      content: `**Recent Midnight Project Launches:**\n\n1. **NightSwap** - Privacy-preserving DEX (Beta)\n2. **MidLock** - Decentralized identity vault\n3. **CipherChat** - Encrypted messaging protocol\n\nAll built on Midnight's privacy layer.`,
      sources: ['Ecosystem Catalog', 'Project Documentation'],
    };
  }
  if (q.includes('compact') || q.includes('contract')) {
    return {
      content: `**Compact Smart Contracts:**\n\nCompact is Midnight's domain-specific language for writing privacy-preserving smart contracts.\n\n**Key Features:**\n- Zero-knowledge proof generation\n- Selective disclosure patterns\n- Private state management\n- Public/private ledger separation\n\n**Resources:**\n- docs.midnight.network/develop/compact\n- Edda Labs Compact tutorials`,
      sources: ['Midnight Docs', 'Edda Labs'],
    };
  }
  if (q.includes('grant') || q.includes('fund')) {
    return {
      content: `**Midnight Ecosystem Grants:**\n\n💰 **Midnight Foundation** - Up to $50k for privacy infra\n🔬 **Research Grants** - Academic ZK research\n🛠️ **Builder Program** - Tooling & SDKs\n\n**Apply at:** grants.midnight.network\n**Deadline:** Rolling applications`,
      sources: ['Grants Portal', 'Foundation Blog'],
    };
  }
  return {
    content: `**Spy Intelligence Report:**\n\nI searched the Midnight ecosystem for *"${query}"*.\n\nHere's what I found across Midnight docs, Edda Labs content, and community channels.\n\nFor more specific intel, try asking about:\n- Specific projects or protocols\n- Technical concepts (ZK proofs, Compact)\n- Community events and governance\n- Grant opportunities`,
    sources: ['Midnight Docs', 'Edda Labs', 'Community Discord'],
  };
};

export function SpyChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "🕶️ **Spy is online.** I'm your private intelligence agent for the Midnight ecosystem.\n\nAsk me anything about Midnight, Edda Labs, projects, grants, or community updates. Your queries stay private.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));
    const { content, sources } = getMockResponse(text);
    const assistantMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content, timestamp: new Date(), sources };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      <div className="rounded-xl border border-border/60 bg-card p-4 mb-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground">Spy AI Assistant</h1>
          <p className="text-xs text-muted-foreground">Privacy-preserving intelligence · Powered by Midnight RAG</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Online
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {quickPrompts.map((p) => (
          <button key={p} onClick={() => sendMessage(p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/60 bg-card text-xs text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors">
            <Search className="h-3 w-3" />{p}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10' : 'bg-muted'}`}>
              {msg.role === 'assistant' ? <Bot className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'items-end' : ''}`}>
              <div className={`rounded-xl p-3 text-sm ${msg.role === 'assistant' ? 'bg-card border border-border/60 text-foreground' : 'bg-primary text-primary-foreground'}`}>
                <div className="whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
              {msg.sources && (
                <div className="flex gap-1 flex-wrap">
                  {msg.sources.map((s) => (
                    <span key={s} className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      <BookOpen className="h-3 w-3" />{s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <div className="bg-card border border-border/60 rounded-xl p-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
          placeholder="Ask Spy anything about Midnight..."
          className="flex-1 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50" />
        <button onClick={() => sendMessage(input)} disabled={!input.trim() || isTyping}
          className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-50 transition-opacity">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

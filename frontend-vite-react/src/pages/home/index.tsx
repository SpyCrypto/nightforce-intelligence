import { useNavigate } from '@tanstack/react-router';
import { MessageSquare, Shield, Target, Award, ArrowRight, Zap, Lock, Users, TrendingUp } from 'lucide-react';
import { useWallet } from '@/modules/midnight/wallet-widget/hooks/useWallet';

const newsItems = [
  { id: 1, title: 'New Compact Contract Tutorial Released', source: 'Edda Labs', time: '2h ago', type: 'education' },
  { id: 2, title: 'Midnight Testnet Upgrade Announced', source: 'Official', time: '5h ago', type: 'update' },
  { id: 3, title: 'Community Grant Program Opens', source: 'Governance', time: '1d ago', type: 'opportunity' },
  { id: 4, title: 'NightSwap DEX Beta Launch', source: 'Ecosystem', time: '2d ago', type: 'launch' },
];

const quickActions = [
  { to: '/spy', label: 'Ask Spy', icon: MessageSquare, desc: 'Get ecosystem intel' },
  { to: '/vault', label: 'My Vault', icon: Shield, desc: 'Private preferences' },
  { to: '/missions', label: 'Missions', icon: Target, desc: 'Earn rewards' },
  { to: '/reputation', label: 'Reputation', icon: Award, desc: 'View badges' },
] as const;

export function Home() {
  const navigate = useNavigate();
  const { status } = useWallet();
  const isConnected = status?.status === 'connected';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="rounded-xl border border-border/60 bg-card p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Midnight Network · Live
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {isConnected ? 'Welcome back, Agent 🕶️' : 'Nightforce Intelligence'}
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              Your private AI operations center for the Midnight ecosystem. Ask Spy anything, store preferences privately, earn reputation badges.
            </p>
          </div>
          {!isConnected && (
            <button
              onClick={() => navigate({ to: '/wallet-ui' })}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Connect Wallet <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map(({ to, label, icon: Icon, desc }) => (
          <button key={to} onClick={() => navigate({ to })}
            className="group flex flex-col gap-2 p-4 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5 transition-all text-left">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" /> Ecosystem Intel
          </h2>
          <div className="space-y-3">
            {newsItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                  item.type === 'update' ? 'bg-blue-400' :
                  item.type === 'education' ? 'bg-green-400' :
                  item.type === 'launch' ? 'bg-purple-400' : 'bg-primary'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-primary">{item.source}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate({ to: '/spy' })}
            className="mt-4 w-full text-xs text-primary hover:underline flex items-center justify-center gap-1">
            Ask Spy for more intel <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> Your Stats
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Missions Completed', value: '0', icon: Target },
                { label: 'Badges Earned', value: '0', icon: Award },
                { label: 'Reputation XP', value: '0', icon: TrendingUp },
                { label: 'Community Rank', value: '—', icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-primary" /> Privacy Status
            </h2>
            <div className="space-y-2">
              {[
                { label: 'Local Vault', status: 'Encrypted' },
                { label: 'ZK Proofs', status: 'Ready' },
                { label: 'Midnight Chain', status: isConnected ? 'Connected' : 'Offline' },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <span className="text-xs text-primary font-medium">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

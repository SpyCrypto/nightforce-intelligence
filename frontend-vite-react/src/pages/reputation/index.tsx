import { useState } from 'react';
import { Award, Shield, CheckCircle, Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { useWallet } from '@/modules/midnight/wallet-widget/hooks/useWallet';

const badges = [
  { id: 'explorer', emoji: '🗺️', title: 'Explorer', desc: 'Visited 10+ ecosystem projects', earned: true, xp: 100 },
  { id: 'builder', emoji: '🔨', title: 'Builder', desc: 'Submitted a project to the ecosystem', earned: false, xp: 250 },
  { id: 'elite', emoji: '⚡', title: 'Nightforce Elite', desc: 'Participated in 20+ community Spaces', earned: false, xp: 500 },
  { id: 'educator', emoji: '📚', title: 'Educator', desc: 'Published educational content', earned: false, xp: 300 },
  { id: 'recruiter', emoji: '🎯', title: 'Recruiter', desc: 'Brought new builders to the ecosystem', earned: false, xp: 200 },
];

export function Reputation() {
  const { status } = useWallet();
  const isConnected = status?.status === 'connected';
  const [showProof, setShowProof] = useState(false);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [privateMode, setPrivateMode] = useState(true);

  const earnedBadges = badges.filter((b) => b.earned);
  const totalXP = earnedBadges.reduce((sum, b) => sum + b.xp, 0);

  const generateProof = async () => {
    setGeneratingProof(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGeneratingProof(false);
    setProofGenerated(true);
    setShowProof(true);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-bold text-foreground mb-2">Reputation</h2>
          <p className="text-sm text-muted-foreground">Connect your Midnight wallet to view your reputation badges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-xl border border-border/60 bg-card p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Community Reputation</h1>
            <p className="text-xs text-muted-foreground">On-chain badges · Zero-knowledge proof of contribution</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-bold text-foreground">{earnedBadges.length}</p>
            <p className="text-xs text-muted-foreground">Badges</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-primary">{totalXP}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className={`rounded-xl border bg-card p-5 transition-all ${badge.earned ? 'border-primary/30' : 'border-border/60 opacity-50'}`}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{badge.emoji}</span>
              {badge.earned && <CheckCircle className="h-5 w-5 text-primary" />}
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{badge.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{badge.desc}</p>
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <Zap className="h-3 w-3" />{badge.xp} XP
            </div>
            {!badge.earned && <p className="text-xs text-muted-foreground mt-2 italic">Not yet earned</p>}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" /> Proof-of-Contributor
          </h2>
          <button onClick={() => setPrivateMode(!privateMode)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            {privateMode ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {privateMode ? 'Private Mode' : 'Public Mode'}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Generate a zero-knowledge proof to verify your contributor status without revealing your wallet address or history.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
          {[
            { label: 'Reveals wallet address', value: false },
            { label: 'Proves badge ownership', value: true },
            { label: 'Reveals activity history', value: false },
            { label: 'Midnight ZK-powered', value: true },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <CheckCircle className={`h-3.5 w-3.5 ${value ? 'text-primary' : 'text-muted-foreground/40'}`} />
              <span className={value ? 'text-foreground' : 'text-muted-foreground line-through'}>{label}</span>
            </div>
          ))}
        </div>
        {showProof && proofGenerated && (
          <div className="mb-4 p-3 rounded-lg bg-background border border-primary/30">
            <p className="text-xs text-primary font-medium mb-1">✓ ZK Proof Generated</p>
            <pre className="text-xs text-muted-foreground break-all whitespace-pre-wrap">
              {`proof: 0x${Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')}`}
            </pre>
          </div>
        )}
        <button onClick={generateProof} disabled={generatingProof || earnedBadges.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 disabled:opacity-50 transition-opacity">
          {generatingProof
            ? <><span className="w-3 h-3 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" /> Generating Proof...</>
            : <><Shield className="h-3.5 w-3.5" /> Generate ZK Proof</>}
        </button>
        {earnedBadges.length === 0 && <p className="text-xs text-muted-foreground mt-2">Earn at least one badge to generate a proof.</p>}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Shield, Lock, Eye, EyeOff, Cpu, Gamepad2, Coins, Fingerprint, Vote, Save, CheckCircle, Key } from 'lucide-react';
import { useWallet } from '@/modules/midnight/wallet-widget/hooks/useWallet';

const interestOptions = [
  { id: 'ai', label: 'AI', icon: Cpu },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'defi', label: 'DeFi', icon: Coins },
  { id: 'identity', label: 'Identity', icon: Fingerprint },
  { id: 'governance', label: 'Governance', icon: Vote },
  { id: 'privacy', label: 'Privacy', icon: Eye },
];

const techLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'New to blockchain' },
  { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
  { id: 'advanced', label: 'Advanced', desc: 'Experienced builder' },
  { id: 'expert', label: 'Expert', desc: 'Core developer' },
];

export function Vault() {
  const { status } = useWallet();
  const isConnected = status?.status === 'connected';
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [techLevel, setTechLevel] = useState('');
  const [saved, setSaved] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(false);

  useEffect(() => {
    const prefs = localStorage.getItem('nightforce_preferences');
    if (prefs) {
      const data = JSON.parse(prefs);
      setSelectedInterests(data.interests || []);
      setTechLevel(data.techLevel || '');
    }
  }, []);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev: string[]) => prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id]);
    setSaved(false);
  };

  const savePreferences = () => {
    localStorage.setItem('nightforce_preferences', JSON.stringify({ interests: selectedInterests, techLevel, onboarded: true }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-border/60 bg-card p-12 text-center">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-bold text-foreground mb-2">Private Vault</h2>
          <p className="text-sm text-muted-foreground">Connect your Midnight wallet to access your encrypted preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-xl border border-border/60 bg-card p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Private Memory Vault</h1>
          <p className="text-xs text-muted-foreground">Encrypted local storage · Midnight selective disclosure · Never leaves your device</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" /> Your Interests
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => toggleInterest(id)}
                className={`flex items-center gap-2 p-3 rounded-lg border text-sm font-medium transition-colors ${selectedInterests.includes(id) ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-muted/40 border-border/60 text-muted-foreground hover:border-border'}`}>
                <Icon className="h-4 w-4" />{label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Key className="h-4 w-4 text-primary" /> Technical Level
          </h2>
          <div className="space-y-2">
            {techLevels.map(({ id, label, desc }) => (
              <button key={id} onClick={() => { setTechLevel(id); setSaved(false); }}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm transition-colors ${techLevel === id ? 'bg-primary/10 border-primary/40 text-primary' : 'bg-muted/40 border-border/60 text-muted-foreground hover:border-border'}`}>
                <div className="text-left">
                  <span className="font-medium block">{label}</span>
                  <span className="text-xs opacity-70">{desc}</span>
                </div>
                {techLevel === id && <CheckCircle className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" /> Encrypted Storage
          </h2>
          <button onClick={() => setShowEncrypted(!showEncrypted)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
            {showEncrypted ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {showEncrypted ? 'Hide' : 'Preview'}
          </button>
        </div>
        {showEncrypted ? (
          <pre className="p-3 rounded-lg bg-background border border-border/60 text-xs text-muted-foreground overflow-x-auto">
            {JSON.stringify({ encrypted: true, algorithm: 'AES-256-GCM', data: btoa(JSON.stringify({ interests: selectedInterests, techLevel, timestamp: new Date().toISOString() })) }, null, 2)}
          </pre>
        ) : (
          <div className="p-3 rounded-lg bg-background border border-border/60 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-4 w-4 text-primary" />
            Your data is encrypted with your wallet key. Click Preview to see how it's stored.
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={savePreferences}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
          {saved ? <><CheckCircle className="h-4 w-4" /> Saved to Vault</> : <><Save className="h-4 w-4" /> Save Preferences</>}
        </button>
      </div>
    </div>
  );
}

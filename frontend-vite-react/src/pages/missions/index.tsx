import { useState } from 'react';
import { Target, CheckCircle, Clock, Zap, Users, BookOpen, Search } from 'lucide-react';

const missions = [
  { id: '1', type: 'scout', title: 'Project Scout', desc: 'Review a new Midnight ecosystem project and submit feedback', xp: 50, reward: '50 XP', difficulty: 'Easy', duration: '~15 min' },
  { id: '2', type: 'intel', title: 'Intel Report', desc: 'Summarize a recent Edda Labs video or community Space', xp: 100, reward: '100 XP + Badge', difficulty: 'Medium', duration: '~30 min' },
  { id: '3', type: 'builder', title: 'Builder Thread', desc: 'Create an educational thread about a Midnight concept', xp: 250, reward: '250 XP + NIGHT', difficulty: 'Hard', duration: '~1 hour' },
  { id: '4', type: 'recruit', title: 'Recruit Agent', desc: 'Bring a new builder to the Midnight community', xp: 200, reward: '200 XP + NFT', difficulty: 'Medium', duration: 'Ongoing' },
  { id: '5', type: 'scout', title: 'Governance Watch', desc: 'Monitor and summarize a governance proposal', xp: 75, reward: '75 XP', difficulty: 'Easy', duration: '~20 min' },
  { id: '6', type: 'intel', title: 'Grant Analyst', desc: 'Research and document an open grant opportunity', xp: 150, reward: '150 XP', difficulty: 'Medium', duration: '~45 min' },
];

const typeConfig: Record<string, { label: string; icon: typeof Target; color: string }> = {
  scout: { label: 'Scout', icon: Search, color: 'text-blue-400 bg-blue-400/10 border-blue-400/30' },
  intel: { label: 'Intel', icon: BookOpen, color: 'text-purple-400 bg-purple-400/10 border-purple-400/30' },
  builder: { label: 'Builder', icon: Zap, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  recruit: { label: 'Recruit', icon: Users, color: 'text-green-400 bg-green-400/10 border-green-400/30' },
};

export function Missions() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'scout', 'intel', 'builder', 'recruit'];

  const filtered = missions.filter((m) => filter === 'all' || m.type === filter);
  const totalXP = [...completed].reduce((sum, id) => sum + (missions.find((m) => m.id === id)?.xp ?? 0), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="rounded-xl border border-border/60 bg-card p-5 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Nightforce Missions</h1>
            <p className="text-xs text-muted-foreground">Complete quests · Earn XP, badges, and NIGHT tokens</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <p className="font-bold text-foreground">{completed.size}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-primary">{totalXP}</p>
            <p className="text-xs text-muted-foreground">XP Earned</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors capitalize ${filter === f ? 'bg-primary/10 border-primary/40 text-primary' : 'border-border/60 text-muted-foreground hover:border-border'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((mission) => {
          const done = completed.has(mission.id);
          const cfg = typeConfig[mission.type];
          const Icon = cfg.icon;
          return (
            <div key={mission.id} className={`rounded-xl border bg-card p-5 transition-all ${done ? 'border-primary/30 opacity-75' : 'border-border/60 hover:border-border'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${cfg.color}`}>
                  <Icon className="h-3 w-3" />{cfg.label}
                </div>
                {done && <CheckCircle className="h-5 w-5 text-primary" />}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">{mission.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{mission.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{mission.difficulty}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{mission.duration}</span>
                <span className="flex items-center gap-1 text-primary font-medium"><Target className="h-3 w-3" />{mission.reward}</span>
              </div>
              <button
                onClick={() => setCompleted((prev) => { const next = new Set(prev); done ? next.delete(mission.id) : next.add(mission.id); return next; })}
                className={`w-full py-2 rounded-lg text-xs font-medium transition-colors ${done ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                {done ? 'Mark Incomplete' : 'Start Mission'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

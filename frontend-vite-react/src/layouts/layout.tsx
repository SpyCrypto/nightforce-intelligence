import { Link, useRouterState } from '@tanstack/react-router';
import { ReactNode } from 'react';
import { LayoutDashboard, MessageSquare, Shield, Target, Award, Wallet } from 'lucide-react';
import { useWallet } from '@/modules/midnight/wallet-widget/hooks/useWallet';

interface MainLayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/spy', label: 'Spy Chat', icon: MessageSquare },
  { to: '/vault', label: 'Vault', icon: Shield },
  { to: '/missions', label: 'Missions', icon: Target },
  { to: '/reputation', label: 'Reputation', icon: Award },
  { to: '/wallet-ui', label: 'Wallet', icon: Wallet },
] as const;

export const MainLayout = ({ children }: MainLayoutProps) => {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { status } = useWallet();
  const isConnected = status?.status === 'connected';

  return (
    <div className="min-h-screen flex flex-col bg-background font-mono">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🕶️</span>
            <div>
              <span className="text-sm font-bold text-primary">Nightforce Intelligence</span>
              <span className="hidden sm:inline text-xs text-muted-foreground ml-2">Midnight Network</span>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map(({ to, label, icon: Icon }) => {
              const isActive = currentPath === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${
              isConnected
                ? 'border-primary/30 bg-primary/10 text-primary'
                : 'border-border/60 bg-muted text-muted-foreground'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`} />
              <span className="hidden sm:inline">{isConnected ? 'Connected' : 'Disconnected'}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6">
        {children}
      </main>

      <footer className="border-t border-border/60 py-4">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">🕶️ Nightforce Intelligence · Midnight Network</p>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-medium">v2</span> · Powered by Edda Labs template
          </p>
        </div>
      </footer>
    </div>
  );
};

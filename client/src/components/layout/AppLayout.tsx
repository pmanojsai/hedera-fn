import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuthStore } from '../../stores/authStore';
import { useWallet } from '../../hooks/useWallet';
import { Shield, Activity, Users, Settings, LogOut, FileText } from 'lucide-react';
import { Button } from '../ui/button';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const { address, role } = useAuthStore();
  const { disconnect } = useWallet();
  const [location] = useLocation();

  const getNavLinks = () => {
    switch (role) {
      case 'PATIENT':
        return [
          { href: '/patient', label: 'Dashboard', icon: Activity },
          { href: '/patient/records', label: 'Medical Records', icon: FileText },
          { href: '/patient/consent', label: 'Consent Management', icon: Shield },
          { href: '/patient/access-log', label: 'Access Log', icon: Activity },
        ];
      case 'DOCTOR':
        return [
          { href: '/doctor', label: 'Dashboard', icon: Activity },
          { href: '/doctor/request-access', label: 'Request Access', icon: Users },
          { href: '/doctor/activity-log', label: 'Activity Log', icon: Activity },
        ];
      case 'ADMIN':
        return [
          { href: '/admin', label: 'Dashboard', icon: Activity },
          { href: '/admin/roles', label: 'Role Assignment', icon: Users },
          { href: '/admin/audit', label: 'Audit Log', icon: FileText },
          { href: '/admin/compliance', label: 'Compliance', icon: Shield },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <span className="font-heading font-bold text-lg">MediChain</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <a className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}>
                  <Icon className="h-5 w-5 mr-3" />
                  {link.label}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-4">
          <div className="text-xs text-muted-foreground break-all px-2">
            Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
          <Button variant="outline" className="w-full justify-start" onClick={disconnect}>
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 lg:hidden">
          <div className="flex items-center">
             <Shield className="h-6 w-6 text-primary mr-2" />
             <span className="font-heading font-bold text-lg">MediChain</span>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuthStore, UserRole } from '../../stores/authStore';
import { useRoleGuard } from '../../hooks/useRoleGuard';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isConnected, isRoleLoading, role } = useAuthStore();
  useRoleGuard(); // Ensure role is fetched
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isConnected) {
      setLocation('/connect-wallet');
    } else if (!isRoleLoading && allowedRoles && role && !allowedRoles.includes(role)) {
      setLocation('/unauthorized');
    }
  }, [isConnected, isRoleLoading, role, allowedRoles, setLocation]);

  if (!isConnected) return null;

  if (isRoleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Verifying identity...</span>
      </div>
    );
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
};

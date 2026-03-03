import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useWallet } from '../../hooks/useWallet';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Shield, Loader2, Wallet } from 'lucide-react';
import { EXPECTED_CHAIN_ID } from '../../lib/constants';

export default function ConnectWallet() {
  const { connect, isConnecting, isCorrectNetwork } = useWallet();
  const { isConnected, role, isRoleLoading } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isConnected && isCorrectNetwork && !isRoleLoading) {
      if (role === 'PATIENT') setLocation('/patient');
      else if (role === 'DOCTOR') setLocation('/doctor');
      else if (role === 'ADMIN') setLocation('/admin');
      else setLocation('/unauthorized');
    }
  }, [isConnected, isCorrectNetwork, isRoleLoading, role, setLocation]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl border p-8 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-bold tracking-tight">Connect Wallet</h2>
          <p className="text-muted-foreground">
            Connect your MetaMask wallet to access the MediChain network on network {EXPECTED_CHAIN_ID}.
          </p>
        </div>

        <Button 
          size="lg" 
          className="w-full h-14 text-lg" 
          onClick={connect}
          disabled={isConnecting || isRoleLoading}
        >
          {isConnecting || isRoleLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wallet className="mr-2 h-5 w-5" />
          )}
          {isConnecting ? 'Connecting...' : isRoleLoading ? 'Verifying Identity...' : 'Connect MetaMask'}
        </Button>

        <p className="text-sm text-muted-foreground">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

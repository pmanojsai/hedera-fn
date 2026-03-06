import { Link } from 'wouter';
import { Button } from '../../components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

export default function Unauthorized() {
  const { disconnect } = useWallet();

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl border p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-10 w-10 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-heading font-bold tracking-tight">Access Denied</h2>
          <p className="text-muted-foreground">
            Your wallet address does not have the required permissions to access this platform. If you believe this is an error, please contact an administrator.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button variant="outline" className="w-full" onClick={disconnect}>
            Disconnect Wallet
          </Button>
          <Link href="/">
            <Button variant="ghost" className="w-full">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

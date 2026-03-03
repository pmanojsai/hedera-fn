import { Link } from 'wouter';
import { Button } from '../../components/ui/button';
import { Shield, Lock, Activity } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 py-4 flex justify-between items-center border-b bg-card">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-xl tracking-tight">MediChain</span>
        </div>
        <Link href="/connect-wallet">
          <Button>Connect Wallet</Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl space-y-8">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground">
            Decentralized <span className="text-primary">DPDP-Compliant</span> Healthcare
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Secure, patient-centric medical records management powered by Web3. Your data, your rules, verified on the blockchain.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/connect-wallet">
              <Button size="lg" className="h-12 px-8 text-lg rounded-full">Get Started</Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="p-6 bg-card rounded-2xl border shadow-sm">
              <Lock className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Absolute Security</h3>
              <p className="text-muted-foreground">Immutable audit logs and encrypted records ensure complete data integrity.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border shadow-sm">
              <Activity className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Instant Access</h3>
              <p className="text-muted-foreground">Authorized doctors can access critical medical history instantly in emergencies.</p>
            </div>
            <div className="p-6 bg-card rounded-2xl border shadow-sm">
              <Shield className="h-10 w-10 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">DPDP Compliant</h3>
              <p className="text-muted-foreground">Built from the ground up to comply with the Digital Personal Data Protection Act.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

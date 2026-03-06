import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useAuthStore } from '../../stores/authStore';
import { User, Mail, Shield } from 'lucide-react';

export default function ProfileSettings() {
  const { address, role } = useAuthStore();

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'PATIENT']}>
      <AppLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Profile Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account preferences and off-chain metadata.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Identity Information</CardTitle>
              <CardDescription>On-chain identity bound to your wallet.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Connected Wallet</label>
                <div className="flex items-center p-3 bg-muted rounded-md font-mono text-sm">
                  {address}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">System Role</label>
                <div className="flex items-center p-3 bg-primary/10 text-primary rounded-md font-medium text-sm w-fit">
                  <Shield className="h-4 w-4 mr-2" />
                  {role}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Preferences</CardTitle>
              <CardDescription>Off-chain contact details for system notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Display Name (Optional)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
                    <User className="h-4 w-4" />
                  </span>
                  <Input placeholder="Dr. Jane Doe" className="rounded-l-none" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Email Address (Encrypted Off-chain)</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input type="email" placeholder="jane@hospital.com" className="rounded-l-none" />
                </div>
              </div>
              <Button className="mt-2">Save Preferences</Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

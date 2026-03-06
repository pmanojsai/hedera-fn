import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { ShieldAlert, AlertCircle, Clock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useState } from 'react';

export default function EmergencyAccess() {
  const [doctorId, setDoctorId] = useState('');

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <AppLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold text-destructive">Emergency Access Management</h1>
            <p className="text-muted-foreground mt-1">Configure break-glass protocols for critical medical situations.</p>
          </div>

          <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold">Emergency Protocol</h3>
              <p className="text-sm mt-1">Emergency access bypasses standard consent requirements but triggers immediate multi-party alerts and is recorded on the blockchain immutably.</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pre-approve Emergency Contacts</CardTitle>
              <CardDescription>Authorize specific medical institutions to access your records in life-threatening situations without manual consent.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input 
                  placeholder="Hospital / Doctor Address (0x...)" 
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button variant="destructive">
                  Add Emergency Contact
                </Button>
              </div>

              <div className="mt-6 border rounded-lg p-4">
                <h4 className="font-medium mb-3">Current Emergency Contacts</h4>
                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center">
                    <ShieldAlert className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="font-mono text-sm">0x71C...976E (City General Hospital)</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Remove</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time-Locked Access</CardTitle>
              <CardDescription>Grant temporary access that automatically expires.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">24-Hour Emergency Window</p>
                    <p className="text-sm text-muted-foreground">Allows any verified doctor temporary access during a declared emergency.</p>
                  </div>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, FileText, CheckCircle2 } from 'lucide-react';

export default function DoctorDashboard() {
  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Doctor Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your patients and access secure medical records.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Accessible Patients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">Active consents</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <FileText className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Awaiting patient approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reports Uploaded</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">142</div>
                <p className="text-xs text-muted-foreground">Encrypted and secured</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Patient Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center p-4 border rounded-lg">
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center font-mono text-xs mr-4">
                      0x{(Math.random() * 1000000).toString(16).slice(0, 4)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Consent Granted</p>
                      <p className="text-sm text-muted-foreground font-mono">Patient: 0x...{Math.random().toString(16).slice(-4)}</p>
                    </div>
                    <Button variant="outline" size="sm">View Records</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

// Needed local Button import for mockup UI
import { Button } from '../../components/ui/button';

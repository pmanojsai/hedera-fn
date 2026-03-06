import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AccessLog() {
  const logs = [
    { id: 1, action: 'Record Accessed', doctor: 'Dr. Sarah Johnson', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Access Denied', doctor: 'Unknown Address (0x44f...9a1)', time: '1 day ago', status: 'failed' },
    { id: 3, action: 'Consent Granted', doctor: 'Dr. Michael Chen', time: '3 days ago', status: 'success' },
  ];

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Access Log</h1>
            <p className="text-muted-foreground mt-1">Immutable audit trail of all interactions with your data.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Blockchain Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center p-4 border rounded-lg">
                    {log.status === 'success' ? (
                      <CheckCircle2 className="h-8 w-8 text-green-500 bg-green-50 p-1.5 rounded-full mr-4" />
                    ) : (
                      <ShieldAlert className="h-8 w-8 text-red-500 bg-red-50 p-1.5 rounded-full mr-4" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-muted-foreground">{log.doctor}</p>
                    </div>
                    <div className="text-sm text-muted-foreground font-mono">
                      {log.time}
                    </div>
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

import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { AlertTriangle, ShieldOff } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function SuspiciousActivity() {
  const alerts = [
    { id: 1, type: 'Multiple Failed Access Attempts', source: '0x44f...9a1', target: 'Patient 0xabc...123', time: '1 hour ago', risk: 'High' },
    { id: 2, type: 'Unrecognized Role Assignment Attempt', source: '0x999...888', target: 'Self', time: '5 hours ago', risk: 'Critical' },
  ];

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-destructive">Suspicious Activity</h1>
            <p className="text-muted-foreground mt-1">Monitor and respond to potential security threats on the network.</p>
          </div>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Active Threats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-center p-4 border rounded-lg bg-red-50/50">
                    <ShieldOff className="h-8 w-8 text-destructive mr-4" />
                    <div className="flex-1">
                      <p className="font-medium text-destructive">{alert.type}</p>
                      <p className="text-sm text-muted-foreground font-mono">Source: {alert.source} | Target: {alert.target}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs rounded font-medium mb-2">
                        {alert.risk} Risk
                      </span>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      <Button variant="destructive" size="sm">Block Address</Button>
                      <Button variant="outline" size="sm">Investigate</Button>
                    </div>
                  </div>
                ))}
                {alerts.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No suspicious activity detected.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

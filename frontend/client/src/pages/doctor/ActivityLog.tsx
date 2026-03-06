import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, Clock, FileText } from 'lucide-react';

export default function ActivityLog() {
  const activities = [
    { id: 1, action: 'Viewed Medical Record', patient: '0xabc...123', type: 'Blood Test Results', time: '2 hours ago' },
    { id: 2, action: 'Uploaded Report', patient: '0xdef...456', type: 'MRI Scan', time: '1 day ago' },
    { id: 3, action: 'Requested Access', patient: '0x789...ghi', type: 'Pending Approval', time: '2 days ago' },
  ];

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Activity Log</h1>
            <p className="text-muted-foreground mt-1">Your interactions with patient records.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>All your read and write operations are logged on the blockchain.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                      {activity.action.includes('Upload') ? (
                        <FileText className="h-5 w-5 text-primary" />
                      ) : activity.action.includes('Requested') ? (
                        <Clock className="h-5 w-5 text-primary" />
                      ) : (
                        <Activity className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">Patient: <span className="font-mono">{activity.patient}</span> • {activity.type}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
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

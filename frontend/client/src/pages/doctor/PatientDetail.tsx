import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Activity, FileText, Download, User as UserIcon } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useLocation } from 'wouter';

export default function PatientDetail() {
  const [, setLocation] = useLocation();
  const patientAddress = "0xabc123...def456";

  const records = [
    { id: 1, type: 'Blood Test Results', date: '2023-10-15', uploader: 'Dr. Sarah Johnson (You)' },
    { id: 2, type: 'MRI Scan', date: '2023-09-02', uploader: 'Dr. Michael Chen' },
  ];

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold flex items-center">
                <UserIcon className="mr-3 h-8 w-8 text-primary" />
                Patient Details
              </h1>
              <p className="text-muted-foreground mt-1 font-mono">{patientAddress}</p>
            </div>
            <Button onClick={() => setLocation('/doctor/upload-report')}>
              Upload New Report
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Access Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-green-600 bg-green-50 p-4 rounded-lg">
                  <Activity className="h-5 w-5 mr-3" />
                  <div>
                    <p className="font-semibold">Consent Active</p>
                    <p className="text-sm">Granted on: 2023-10-10</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  View Activity Log
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Relinquish Access
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Decrypted records shared via IPFS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {records.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-primary/60 bg-primary/10 p-1.5 rounded-lg mr-4" />
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-muted-foreground">Uploaded by {record.uploader} on {record.date}</p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      <Download className="h-4 w-4 mr-2" /> View
                    </Button>
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

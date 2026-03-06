import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { FileText, Download, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function MedicalRecords() {
  const records = [
    { id: 1, type: 'Blood Test', date: '2023-10-15', doctor: 'Dr. Sarah Johnson' },
    { id: 2, type: 'MRI Scan', date: '2023-09-02', doctor: 'Dr. Michael Chen' },
    { id: 3, type: 'Vaccination Record', date: '2023-05-20', doctor: 'Dr. Emily Wong' },
  ];

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Medical Records</h1>
            <p className="text-muted-foreground mt-1">View and manage your encrypted medical files.</p>
          </div>

          <div className="grid gap-4">
            {records.map((record) => (
              <Card key={record.id}>
                <CardContent className="flex items-center p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mr-6">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{record.type}</h3>
                    <p className="text-sm text-muted-foreground">Uploaded by {record.doctor} on {record.date}</p>
                    <div className="flex items-center mt-2 text-xs text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
                      <Lock className="h-3 w-3 mr-1" />
                      Encrypted on IPFS
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Decrypt & View
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

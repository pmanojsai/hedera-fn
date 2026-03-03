import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { AlertCircle, Send } from 'lucide-react';

export default function Grievance() {
  return (
    <ProtectedRoute allowedRoles={['PATIENT', 'DOCTOR']}>
      <AppLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Grievance & Support</h1>
            <p className="text-muted-foreground mt-1">Report issues, compliance violations, or technical problems.</p>
          </div>

          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg flex items-start border border-amber-200">
            <AlertCircle className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
            <p className="text-sm">
              Under the DPDP Act, you have the right to grievance redressal. All complaints regarding unauthorized data access or consent violations are prioritized.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submit a Report</CardTitle>
              <CardDescription>Provide details about the issue. This will be securely transmitted to the administration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Issue Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Unauthorized Access</option>
                  <option>Data Inaccuracy</option>
                  <option>Technical Platform Issue</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Related Transaction Hash (Optional)</label>
                <Input placeholder="0x..." className="font-mono" />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea placeholder="Please describe the issue in detail..." className="h-32" />
              </div>

              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Submit Grievance
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

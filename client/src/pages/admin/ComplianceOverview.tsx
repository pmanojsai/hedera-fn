import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { Progress } from '../../components/ui/progress';

export default function ComplianceOverview() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">DPDP Compliance Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor system adherence to the Digital Personal Data Protection Act.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-green-200 bg-green-50/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-800 flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Overall Compliance Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-700 mb-4">98%</div>
                <Progress value={98} className="h-2 bg-green-200" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-amber-600">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Action Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">2 Pending Issues</div>
                <p className="text-sm text-muted-foreground">Review recent data deletion requests.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>DPDP Act Key Pillars</CardTitle>
              <CardDescription>Status of technical implementation for compliance requirements.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: 'Notice & Consent', desc: 'Patients must explicitly grant consent via smart contract.', status: 100 },
                { title: 'Data Minimization', desc: 'Only collecting necessary medical data.', status: 90 },
                { title: 'Data Security', desc: 'IPFS encryption and decentralized storage.', status: 100 },
                { title: 'Right to Erasure', desc: 'Ability for patients to revoke access and request off-chain deletion.', status: 85 },
              ].map((pillar, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm">{pillar.title}</span>
                    <span className="text-sm font-medium">{pillar.status}%</span>
                  </div>
                  <Progress value={pillar.status} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{pillar.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

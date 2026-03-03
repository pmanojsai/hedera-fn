import { useState } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Key } from 'lucide-react';
import { useTransaction } from '../../hooks/useTransaction';
import { useContract } from '../../hooks/useContract';
import { useContractStore } from '../../stores/contractStore';

export default function RequestAccess() {
  const [patientAddress, setPatientAddress] = useState('');
  const { executeTransaction } = useTransaction();
  const contract = useContract();
  const { isTransactionPending } = useContractStore();

  const handleRequest = async () => {
    if (!patientAddress) return;
    await executeTransaction(
      () => contract.requestAccess(patientAddress),
      'Access request sent to patient'
    );
    setPatientAddress('');
  };

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Request Patient Access</h1>
            <p className="text-muted-foreground mt-1">Initiate a request for access to a patient's medical records.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>New Access Request</CardTitle>
              <CardDescription>This will trigger an event on the blockchain. The patient must approve it via their dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Patient Wallet Address</label>
                <Input 
                  placeholder="0x..." 
                  value={patientAddress}
                  onChange={(e) => setPatientAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              <Button 
                onClick={handleRequest} 
                disabled={!patientAddress || isTransactionPending}
                className="w-full"
              >
                <Key className="mr-2 h-4 w-4" />
                Submit Access Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

import { useState } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Shield, ShieldOff, Search } from 'lucide-react';
import { useTransaction } from '../../hooks/useTransaction';
import { useContract } from '../../hooks/useContract';
import { useContractStore } from '../../stores/contractStore';
import { useAuthStore } from '../../stores/authStore';

export default function ConsentManagement() {
  const [doctorAddress, setDoctorAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  const { executeTransaction } = useTransaction();
  const contract = useContract();
  const { isTransactionPending } = useContractStore();
  const { address } = useAuthStore();

  const handleGrant = async () => {
    if (!doctorAddress) return;
    await executeTransaction(
      () => contract.grantConsent(doctorAddress),
      'Consent granted successfully'
    );
    setDoctorAddress('');
  };

  const handleRevoke = async () => {
    if (!doctorAddress) return;
    await executeTransaction(
      () => contract.revokeConsent(doctorAddress),
      'Consent revoked successfully'
    );
    setDoctorAddress('');
  };

  const checkConsent = async () => {
    if (!searchAddress || !address) return;
    try {
      const result = await contract.hasConsent(address, searchAddress);
      setHasConsent(result);
    } catch (e) {
      console.error(e);
      setHasConsent(null);
    }
  };

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <AppLayout>
        <div className="space-y-6 max-w-4xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Consent Management</h1>
            <p className="text-muted-foreground mt-1">Control which doctors can access your medical records.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Manage Doctor Access</CardTitle>
              <CardDescription>Grant or revoke access to your encrypted medical records via smart contract.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input 
                  placeholder="Doctor's Ethereum Address (0x...)" 
                  value={doctorAddress}
                  onChange={(e) => setDoctorAddress(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={handleGrant} 
                  disabled={!doctorAddress || isTransactionPending}
                  className="flex-1"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Grant Consent
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleRevoke}
                  disabled={!doctorAddress || isTransactionPending}
                  className="flex-1"
                >
                  <ShieldOff className="mr-2 h-4 w-4" />
                  Revoke Consent
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check Consent Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-4">
                <Input 
                  placeholder="Doctor's Address to check" 
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="font-mono text-sm"
                />
                <Button variant="secondary" onClick={checkConsent}>
                  <Search className="mr-2 h-4 w-4" />
                  Check
                </Button>
              </div>
              {hasConsent !== null && (
                <div className={`p-4 rounded-lg border ${hasConsent ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <p className={`font-medium flex items-center ${hasConsent ? 'text-green-700' : 'text-red-700'}`}>
                    {hasConsent ? (
                      <><Shield className="mr-2 h-5 w-5" /> Active Consent Found</>
                    ) : (
                      <><ShieldOff className="mr-2 h-5 w-5" /> No Consent Found</>
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

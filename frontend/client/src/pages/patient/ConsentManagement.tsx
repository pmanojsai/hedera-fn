import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Shield, ShieldOff, Search } from 'lucide-react';
import { useTransaction } from '../../hooks/useTransaction';
import { approveConsent, rejectConsent, getConsentRequests } from '../../services/contract';
import { useContractStore } from '../../stores/contractStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

export default function ConsentManagement() {
  const [doctorAddress, setDoctorAddress] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [consentRequests, setConsentRequests] = useState<any[]>([]);

  const { executeTransaction } = useTransaction();
  const { isTransactionPending } = useContractStore();
  const { address } = useAuthStore();

  useEffect(() => {
    if (address) {
      loadConsentRequests();
    }
  }, [address]);

  const loadConsentRequests = async () => {
    if (!address) return;
    try {
      const requests = await getConsentRequests(address);
      setConsentRequests(requests);
    } catch (error) {
      console.error('Failed to load consent requests:', error);
    }
  };

  const handleGrant = async (requestId: number) => {
    try {
      const result = await approveConsent(requestId);
      await executeTransaction(
        async () => {
          const receipt = await result.wait();
          return receipt;
        },
        'Consent granted successfully'
      );
      toast.success(`Consent granted! Transaction: ${result.hash}`);
      loadConsentRequests();
    } catch (error: any) {
      toast.error(error.message || 'Failed to grant consent');
    }
  };

  const handleRevoke = async (requestId: number) => {
    try {
      const result = await rejectConsent(requestId);
      await executeTransaction(
        async () => {
          const receipt = await result.wait();
          return receipt;
        },
        'Consent revoked successfully'
      );
      toast.success(`Consent revoked! Transaction: ${result.hash}`);
      loadConsentRequests();
    } catch (error: any) {
      toast.error(error.message || 'Failed to revoke consent');
    }
  };

  const checkConsent = async () => {
    if (!searchAddress || !address) return;
    try {
      // This would need to be implemented in the contract service
      // For now, we'll check if there's an active consent request
      const requests = await getConsentRequests(address);
      const activeConsent = requests.find((req: any) => 
        req.fiduciary.toLowerCase() === searchAddress.toLowerCase() && req.granted
      );
      setHasConsent(!!activeConsent);
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
              <CardTitle>Pending Consent Requests</CardTitle>
              <CardDescription>Doctors requesting access to your medical records</CardDescription>
            </CardHeader>
            <CardContent>
              {consentRequests.length === 0 ? (
                <p className="text-muted-foreground">No pending requests</p>
              ) : (
                <div className="space-y-4">
                  {consentRequests.map((request: any) => (
                    <div key={request.requestId} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Request from: {request.fiduciary}</p>
                          <p className="text-sm text-muted-foreground">Purpose: {request.purpose}</p>
                          <p className="text-sm text-muted-foreground">
                            Status: {request.granted ? '✅ Granted' : '⏳ Pending'}
                          </p>
                        </div>
                        {!request.granted && (
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleGrant(request.requestId)}
                              disabled={isTransactionPending}
                            >
                              <Shield className="mr-1 h-3 w-3" />
                              Grant
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRevoke(request.requestId)}
                              disabled={isTransactionPending}
                            >
                              <ShieldOff className="mr-1 h-3 w-3" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

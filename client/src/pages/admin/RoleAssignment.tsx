import { useState } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { UserPlus } from 'lucide-react';
import { useTransaction } from '../../hooks/useTransaction';
import { useContract } from '../../hooks/useContract';
import { useContractStore } from '../../stores/contractStore';

export default function RoleAssignment() {
  const [userAddress, setUserAddress] = useState('');
  const [role, setRole] = useState<string>('PATIENT');
  
  const { executeTransaction } = useTransaction();
  const contract = useContract();
  const { isTransactionPending } = useContractStore();

  const handleAssign = async () => {
    if (!userAddress || !role) return;
    await executeTransaction(
      () => contract.assignRole(userAddress, role),
      `Role ${role} assigned successfully`
    );
    setUserAddress('');
  };

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AppLayout>
        <div className="space-y-6 max-w-2xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Role Management</h1>
            <p className="text-muted-foreground mt-1">Assign system roles to new users.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Assign New Role</CardTitle>
              <CardDescription>Grant specific permissions to wallet addresses in the smart contract.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Wallet Address</label>
                <Input 
                  placeholder="0x..." 
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  className="font-mono"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PATIENT">Patient</SelectItem>
                    <SelectItem value="DOCTOR">Doctor</SelectItem>
                    <SelectItem value="ADMIN">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleAssign} 
                disabled={!userAddress || isTransactionPending}
                className="w-full mt-4"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Assign Role
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

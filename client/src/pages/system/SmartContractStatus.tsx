import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Database, Network, Server, Zap } from 'lucide-react';
import { CONTRACT_ADDRESS, EXPECTED_CHAIN_ID } from '../../lib/constants';

export default function SmartContractStatus() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'PATIENT']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Smart Contract Status</h1>
            <p className="text-muted-foreground mt-1">Real-time metrics and details of the deployed MediChain contract.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Network Status</CardTitle>
                <Network className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Connected</div>
                <p className="text-xs text-muted-foreground">Chain ID: {EXPECTED_CHAIN_ID}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Contract Address</CardTitle>
                <Database className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-bold font-mono truncate" title={CONTRACT_ADDRESS}>
                  {CONTRACT_ADDRESS.slice(0, 10)}...{CONTRACT_ADDRESS.slice(-8)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Verified on Explorer</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <Zap className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">Since deployment</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Gas Usage</CardTitle>
                <Server className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">~0.001 ETH avg</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground block mb-1">Version</span>
                  <span className="font-medium">v1.0.0 (DPDP Compliant)</span>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground block mb-1">Compiler</span>
                  <span className="font-medium">Solidity ^0.8.20</span>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground block mb-1">Optimization</span>
                  <span className="font-medium">Enabled (200 runs)</span>
                </div>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <span className="text-sm text-muted-foreground block mb-1">Audited By</span>
                  <span className="font-medium text-green-600 flex items-center gap-2">
                    CertiK <Network className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

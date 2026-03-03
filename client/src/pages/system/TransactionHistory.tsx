import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { ExternalLink, Database, Activity } from 'lucide-react';
import { EXPLORER_URL } from '../../lib/constants';

export default function TransactionHistory() {
  const transactions = [
    { hash: '0x1a2b...3c4d', method: 'grantConsent(address)', status: 'Success', block: '14523901', fee: '0.0012 ETH', time: '1 hour ago' },
    { hash: '0x5e6f...7g8h', method: 'uploadRecord(string)', status: 'Success', block: '14523850', fee: '0.0045 ETH', time: '3 hours ago' },
    { hash: '0x9i0j...1k2l', method: 'revokeConsent(address)', status: 'Success', block: '14523100', fee: '0.0010 ETH', time: '2 days ago' },
  ];

  return (
    <ProtectedRoute allowedRoles={['ADMIN', 'DOCTOR', 'PATIENT']}>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-heading font-bold">Transaction History</h1>
            <p className="text-muted-foreground mt-1">Your on-chain activity and gas usage.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contract Interactions</CardTitle>
              <CardDescription>Verified blockchain transactions initiated by your connected wallet.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                        <Database className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono font-medium text-sm">{tx.method}</p>
                        <p className="text-xs text-muted-foreground flex items-center mt-1">
                          Block: {tx.block} • Fee: {tx.fee}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {tx.status}
                      </span>
                      <span className="text-muted-foreground">{tx.time}</span>
                      <a 
                        href={`${EXPLORER_URL}/tx/${tx.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline flex items-center font-mono"
                      >
                        {tx.hash} <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
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

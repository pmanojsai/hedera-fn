import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { getAuditLogs } from '../../services/contract';
import toast from 'react-hot-toast';

export default function AuditLog() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      const auditLogs = await getAuditLogs();
      setLogs(auditLogs);
    } catch (error: any) {
      toast.error(error.message || 'Failed to load audit logs');
      // Fallback to mock data for demo
      setLogs([
        { txHash: '0x123...abc', event: 'RoleAssigned', user: '0xabc...123', details: 'Assigned DOCTOR role', time: '10 mins ago' },
        { txHash: '0x456...def', event: 'ConsentGranted', user: '0xdef...456', details: 'Granted to 0xabc...123', time: '1 hour ago' },
        { txHash: '0x789...ghi', event: 'RecordUploaded', user: '0xabc...123', details: 'IPFS Hash QmXyZ...', time: '3 hours ago' },
        { txHash: '0x321...zyx', event: 'ConsentRevoked', user: '0xdef...456', details: 'Revoked from 0x999...888', time: '1 day ago' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.txHash.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.event.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-heading font-bold">System Audit Log</h1>
              <p className="text-muted-foreground mt-1">Immutable record of all smart contract events.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={loadAuditLogs} disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex space-x-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by Tx Hash or Address..." 
                    className="pl-9" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="secondary" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="w-full overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Transaction Hash</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Event Type</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Initiator</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Details</th>
                        <th className="h-10 px-4 text-left font-medium text-muted-foreground">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.map((log, i) => (
                        <tr key={i} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 font-mono text-primary cursor-pointer hover:underline">{log.txHash}</td>
                          <td className="p-4 font-medium">{log.event}</td>
                          <td className="p-4 font-mono">{log.user}</td>
                          <td className="p-4">{log.details}</td>
                          <td className="p-4 text-muted-foreground">{log.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

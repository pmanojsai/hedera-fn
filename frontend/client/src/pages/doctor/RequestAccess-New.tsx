import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { User, Clock, FileText, Search, Filter, Key } from 'lucide-react';
import { requestAccess, getAccessRequests } from '../../services/contract';
import { useContractStore } from '../../stores/contractStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

interface AccessRequest {
  id: string;
  patientAddress: string;
  patientName?: string;
  doctorAddress: string;
  doctorName?: string;
  dataType: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
  expiry?: number;
  txHash?: string;
}

export default function RequestAccess() {
  const [patientAddress, setPatientAddress] = useState('');
  const [patientName, setPatientName] = useState('');
  const [dataType, setDataType] = useState('medical_records');
  const [purpose, setPurpose] = useState('');
  const [myRequests, setMyRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  
  const { isTransactionPending } = useContractStore();
  const { address } = useAuthStore();

  useEffect(() => {
    loadMyRequests();
  }, [address]);

  const loadMyRequests = async () => {
    if (!address) return;
    try {
      const requests = await getAccessRequests(address);
      const formattedRequests = requests.map((req: any, index: number) => ({
        id: `req-${index}`,
        patientAddress: req.patientAddress,
        patientName: `Patient ${req.patientAddress.slice(-4)}`,
        doctorAddress: req.doctorAddress || address,
        doctorName: `Dr. ${address?.slice(-4)}`,
        dataType: req.dataType,
        purpose: `Access to ${req.dataType} for medical consultation`,
        status: req.approved ? 'approved' : req.rejected ? 'rejected' : 'pending',
        timestamp: req.timestamp,
        expiry: req.expiry,
        txHash: req.txHash
      }));
      setMyRequests(formattedRequests);
    } catch (error) {
      console.error('Failed to load requests:', error);
    }
  };

  const handleSubmit = async () => {
    if (!patientAddress || !purpose) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!patientAddress.startsWith('0x') || patientAddress.length !== 42) {
      toast.error('Invalid patient wallet address');
      return;
    }

    setLoading(true);
    try {
      const result = await requestAccess(patientAddress, dataType);
      
      const newRequest: AccessRequest = {
        id: `req-${Date.now()}`,
        patientAddress,
        patientName: patientName || `Patient ${patientAddress.slice(-4)}`,
        doctorAddress: address || '',
        doctorName: `Dr. ${address?.slice(-4)}`,
        dataType,
        purpose,
        status: 'pending',
        timestamp: Date.now(),
        txHash: result.hash
      };

      setMyRequests(prev => [newRequest, ...prev]);
      setPatientAddress('');
      setPatientName('');
      setPurpose('');
      
      toast.success(`Access request sent! TX: ${result.hash.slice(0, 10)}...`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = myRequests.filter(request => {
    const matchesSearch = 
      request.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.patientAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return '✅';
      case 'rejected': return '❌';
      case 'pending': return '⏳';
      default: return '❓';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* New Request Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Request Patient Access
              </CardTitle>
              <CardDescription>
                Send access requests to patients for their medical records. All requests are recorded on the blockchain.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Patient Wallet Address *</label>
                  <Input 
                    placeholder="0x..." 
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Patient Name (Optional)</label>
                  <Input 
                    placeholder="John Doe" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Data Type</label>
                  <select 
                    value={dataType}
                    onChange={(e) => setDataType(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="medical_records">Medical Records</option>
                    <option value="lab_results">Lab Results</option>
                    <option value="prescriptions">Prescriptions</option>
                    <option value="imaging">Medical Imaging</option>
                    <option value="emergency">Emergency Data</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Purpose of Access *</label>
                  <Input 
                    placeholder="e.g., Routine checkup, Emergency consultation" 
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  />
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={!patientAddress || !purpose || loading || isTransactionPending}
                className="w-full"
              >
                <Key className="mr-2 h-4 w-4" />
                {loading ? 'Sending...' : 'Send Access Request'}
              </Button>
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  My Access Requests
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search requests..." 
                      className="pl-9 w-48" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredRequests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No access requests found</p>
                  <p className="text-sm">Submit your first request above</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{request.patientName}</p>
                              <p className="text-sm text-muted-foreground font-mono">{request.patientAddress}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(request.status)}>
                              {getStatusIcon(request.status)} {request.status.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(request.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm"><strong>Data Type:</strong> {request.dataType}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm"><strong>Purpose:</strong> {request.purpose}</span>
                        </div>
                        {request.expiry && (
                          <div className="text-sm text-muted-foreground">
                            <strong>Expires:</strong> {new Date(request.expiry).toLocaleDateString()}
                          </div>
                        )}
                        {request.txHash && (
                          <div className="text-xs text-muted-foreground">
                            <strong>Transaction:</strong> 
                            <span className="font-mono">{request.txHash.slice(0, 10)}...{request.txHash.slice(-8)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

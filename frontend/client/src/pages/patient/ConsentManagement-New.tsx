import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Shield, ShieldOff, Search, User, Clock, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { approveConsent, rejectConsent, getConsentRequests } from '../../services/contract';
import { useContractStore } from '../../stores/contractStore';
import { useAuthStore } from '../../stores/authStore';
import toast from 'react-hot-toast';

interface ConsentRequest {
  id: string;
  requestId: number;
  patientAddress: string;
  patientName: string;
  doctorAddress: string;
  doctorName: string;
  purpose: string;
  dataType: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: number;
  expiry?: number;
  txHash?: string;
}

export default function ConsentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [consentRequests, setConsentRequests] = useState<ConsentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  
  const { isTransactionPending } = useContractStore();
  const { address } = useAuthStore();

  useEffect(() => {
    loadConsentRequests();
  }, [address]);

  const loadConsentRequests = async () => {
    if (!address) return;
    try {
      const requests = await getConsentRequests(address);
      const formattedRequests = requests.map((req: any, index: number) => ({
        id: `consent-${index}`,
        requestId: req.requestId || index,
        patientAddress: req.dataPrincipal || address,
        patientName: `You (Patient)`,
        doctorAddress: req.fiduciary,
        doctorName: `Dr. ${req.fiduciary.slice(-4)}`,
        purpose: req.purpose || `Access to ${req.dataType || 'medical records'}`,
        dataType: req.dataType || 'medical_records',
        status: req.granted ? 'approved' : req.rejected ? 'rejected' : 'pending',
        timestamp: req.timestamp,
        expiry: req.expiry,
        txHash: req.txHash
      }));
      setConsentRequests(formattedRequests);
    } catch (error) {
      console.error('Failed to load consent requests:', error);
    }
  };

  const handleApprove = async (requestId: number) => {
    setLoading(true);
    try {
      const result = await approveConsent(requestId);
      
      setConsentRequests(prev => 
        prev.map(req => 
          req.requestId === requestId 
            ? { ...req, status: 'approved', txHash: result.hash }
            : req
        )
      );
      
      toast.success(`Consent approved! TX: ${result.hash.slice(0, 10)}...`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve consent');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (requestId: number) => {
    setLoading(true);
    try {
      const result = await rejectConsent(requestId);
      
      setConsentRequests(prev => 
        prev.map(req => 
          req.requestId === requestId 
            ? { ...req, status: 'rejected', txHash: result.hash }
            : req
        )
      );
      
      toast.success(`Consent rejected! TX: ${result.hash.slice(0, 10)}...`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject consent');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = consentRequests.filter(request => {
    const matchesSearch = 
      request.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.doctorAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.dataType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const pendingCount = consentRequests.filter(req => req.status === 'pending').length;
  const approvedCount = consentRequests.filter(req => req.status === 'approved').length;
  const rejectedCount = consentRequests.filter(req => req.status === 'rejected').length;

  return (
    <ProtectedRoute allowedRoles={['PATIENT']}>
      <AppLayout>
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{pendingCount}</p>
                    <p className="text-sm text-muted-foreground">Pending Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{approvedCount}</p>
                    <p className="text-sm text-muted-foreground">Approved Access</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{rejectedCount}</p>
                    <p className="text-sm text-muted-foreground">Rejected Requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Consent Management
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by doctor name or purpose..." 
                      className="pl-9 w-64" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Requests</option>
                    <option value="pending">Pending Only</option>
                    <option value="approved">Approved Only</option>
                    <option value="rejected">Rejected Only</option>
                  </select>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Consent Requests List */}
          <Card>
            <CardContent className="p-0">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No Consent Requests Found</h3>
                  <p>You don't have any consent requests matching your current filter.</p>
                  <p className="text-sm">Doctors will send requests when they need access to your medical records.</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-6 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-lg">{request.doctorName}</p>
                              <Badge className={getStatusColor(request.status)}>
                                <div className="flex items-center gap-1">
                                  {getStatusIcon(request.status)}
                                  <span className="text-xs font-medium">{request.status.toUpperCase()}</span>
                                </div>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground font-mono">{request.doctorAddress}</p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(request.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
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
                      
                      {request.status === 'pending' && (
                        <div className="flex gap-3 pt-4 border-t">
                          <Button 
                            onClick={() => handleApprove(request.requestId)}
                            disabled={loading || isTransactionPending}
                            className="flex-1"
                          >
                            <Shield className="mr-2 h-4 w-4" />
                            Approve Access
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleReject(request.requestId)}
                            disabled={loading || isTransactionPending}
                            className="flex-1"
                          >
                            <ShieldOff className="mr-2 h-4 w-4" />
                            Reject Access
                          </Button>
                        </div>
                      )}
                      
                      {request.status === 'approved' && (
                        <div className="pt-4 border-t">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Access Granted - Doctor can now view your {request.dataType}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {request.status === 'rejected' && (
                        <div className="pt-4 border-t">
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <XCircle className="h-5 w-5 text-red-600" />
                              <span className="text-sm font-medium text-red-800">
                                Access Rejected - Doctor cannot access your {request.dataType}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
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

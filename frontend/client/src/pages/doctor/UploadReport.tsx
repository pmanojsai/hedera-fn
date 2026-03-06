import { useState } from 'react';
import { ProtectedRoute } from '../../components/layout/ProtectedRoute';
import { AppLayout } from '../../components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { UploadCloud, File, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UploadReport() {
  const [patientAddress, setPatientAddress] = useState('');
  const [reportType, setReportType] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!patientAddress || !reportType) return;
    setIsUploading(true);
    // Simulate IPFS upload and contract interaction
    setTimeout(() => {
      setIsUploading(false);
      toast.success('Report encrypted and uploaded successfully');
      setPatientAddress('');
      setReportType('');
    }, 2000);
  };

  return (
    <ProtectedRoute allowedRoles={['DOCTOR']}>
      <AppLayout>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h1 className="text-3xl font-heading font-bold">Upload Medical Report</h1>
            <p className="text-muted-foreground mt-1">Encrypt and upload records to IPFS for patient access.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Secure Upload</CardTitle>
              <CardDescription>Files are encrypted using the patient's public key before uploading to IPFS.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Patient Wallet Address</label>
                  <Input 
                    placeholder="0x..." 
                    value={patientAddress}
                    onChange={(e) => setPatientAddress(e.target.value)}
                    className="font-mono"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type / Title</label>
                  <Input 
                    placeholder="e.g. Annual Blood Test Results" 
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Clinical Notes (Optional)</label>
                  <Textarea placeholder="Add any secure notes here..." className="h-24" />
                </div>
                
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <File className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium">Click to select or drag and drop file</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DICOM, or JPEG up to 50MB</p>
                </div>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start text-sm">
                <Lock className="h-5 w-5 mr-3 mt-0.5 shrink-0" />
                <p>This document will be automatically encrypted. Only you and the patient (and those they grant consent to) will be able to decrypt and read it.</p>
              </div>

              <Button 
                onClick={handleUpload} 
                disabled={!patientAddress || !reportType || isUploading}
                className="w-full"
              >
                {isUploading ? 'Encrypting & Uploading...' : (
                  <><UploadCloud className="mr-2 h-4 w-4" /> Upload Secure Report</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

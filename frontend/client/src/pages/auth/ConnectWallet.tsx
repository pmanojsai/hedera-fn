import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useWallet } from '../../hooks/useWallet';
import { useAuthStore } from '../../stores/authStore';
import { Button } from '../../components/ui/button';
import { Shield, Loader2, Wallet, QrCode, Keyboard } from 'lucide-react';
import { EXPECTED_CHAIN_ID } from '../../lib/constants';
import { QRScanner } from '../../components/ui/qr-scanner-fixed';

export default function ConnectWallet() {
  const { connect, isConnecting, isCorrectNetwork } = useWallet();
  const { isConnected, role, isRoleLoading, testConnect } = useAuthStore();
  const [, setLocation] = useLocation();
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualAddress, setManualAddress] = useState('');

  useEffect(() => {
    if (isConnected && isCorrectNetwork && !isRoleLoading) {
      if (role === 'PATIENT') setLocation('/patient');
      else if (role === 'DOCTOR') setLocation('/doctor');
      else if (role === 'ADMIN') setLocation('/admin');
      else setLocation('/unauthorized');
    }
  }, [isConnected, isCorrectNetwork, isRoleLoading, role, setLocation]);

  const handleQRScan = async (result: string) => {
    try {
      // Check if it's a wallet address or connection URI
      if (result.startsWith('0x') && result.length === 42) {
        // Direct wallet address
        setManualAddress(result);
        setShowQRScanner(false);
      } else if (result.startsWith('ethereum:')) {
        // EIP-681 URI
        const url = new URL(result);
        const address = url.pathname.substring(2);
        setManualAddress(address);
        setShowQRScanner(false);
      } else {
        alert('Invalid QR code format. Please scan a wallet address or connection URI.');
      }
    } catch (error) {
      alert('Failed to process QR code. Please try again.');
    }
  };

  const handleManualConnect = async () => {
    if (!manualAddress) {
      alert('Please enter a wallet address');
      return;
    }
    
    if (!manualAddress.startsWith('0x') || manualAddress.length !== 42) {
      alert('Invalid wallet address format');
      return;
    }
    
    await connect();
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-3xl shadow-xl border p-8 space-y-8 text-center">
        <div className="flex justify-center">
          <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-heading font-bold tracking-tight">Connect Wallet</h2>
          <p className="text-muted-foreground">
            Connect your MetaMask wallet to access the MediChain network on network {EXPECTED_CHAIN_ID}.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            size="lg" 
            className="w-full h-14 text-lg" 
            onClick={connect}
            disabled={isConnecting || isRoleLoading}
          >
            {isConnecting || isRoleLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wallet className="mr-2 h-5 w-5" />
            )}
            {isConnecting ? 'Connecting...' : isRoleLoading ? 'Verifying Identity...' : 'Connect MetaMask'}
          </Button>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowQRScanner(true)}
              disabled={isConnecting || isRoleLoading}
            >
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setShowManualEntry(true)}
              disabled={isConnecting || isRoleLoading}
            >
              <Keyboard className="mr-2 h-4 w-4" />
              Manual Entry
            </Button>
          </div>

          {/* Testing Section */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Testing Mode (Bypass Wallet)</p>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testConnect('PATIENT')}
                disabled={isConnecting || isRoleLoading}
              >
                Test Patient
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testConnect('DOCTOR')}
                disabled={isConnecting || isRoleLoading}
              >
                Test Doctor
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => testConnect('ADMIN')}
                disabled={isConnecting || isRoleLoading}
              >
                Test Admin
              </Button>
            </div>
          </div>

          {manualAddress && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-mono break-all">{manualAddress}</p>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Connect with MetaMask or scan a wallet QR code</p>
            <p>• Ensure MetaMask is installed and unlocked</p>
            <p>• Make sure you're on the correct network (Chain ID: {EXPECTED_CHAIN_ID})</p>
            <p>• Approve the connection request in MetaMask</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <QRScanner 
          onScan={handleQRScan}
          onClose={() => setShowQRScanner(false)}
        />
      )}

      {/* Manual Entry Modal */}
      {showManualEntry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-semibold">Manual Wallet Entry</h3>
            <input
              type="text"
              placeholder="Enter wallet address (0x...)"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              className="w-full p-3 border rounded-lg font-mono text-sm"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowManualEntry(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleManualConnect}
                disabled={!manualAddress || isConnecting}
                className="flex-1"
              >
                Connect
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

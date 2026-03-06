import { useState, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { Camera, X, QrCode } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    if (isScanning) {
      startScanning();
    } else {
      stopScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isScanning]);

  const startScanning = async () => {
    try {
      if (!videoRef.current) return;

      readerRef.current = new BrowserMultiFormatReader();
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      readerRef.current.decodeFromVideoDevice(undefined, videoRef.current)
        .then((result: Result) => {
          if (result && result.getText()) {
            onScan(result.getText());
            setIsScanning(false);
          }
        })
        .catch((err) => {
          console.error('QR scan error:', err);
          setError('Failed to scan QR code. Please try again.');
        });
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (readerRef.current) {
      readerRef.current.reset();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Scan QR Code
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isScanning ? (
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Scan a QR code containing a wallet address or connection URI
              </p>
              <Button 
                onClick={() => setIsScanning(true)} 
                className="w-full"
                disabled={!!error}
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Camera
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <video 
                  ref={videoRef} 
                  className="w-full h-64 object-cover rounded-lg bg-black"
                  autoPlay 
                  playsInline
                />
                <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-lg">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsScanning(false)} 
                className="w-full"
              >
                Stop Scanning
              </Button>
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

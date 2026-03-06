import { useContractStore } from '../../stores/contractStore';
import { EXPLORER_URL } from '../../lib/constants';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export const TransactionModal = () => {
  const { 
    isTransactionPending, 
    transactionHash, 
    transactionError, 
    transactionSuccess,
    resetTransaction
  } = useContractStore();

  const isOpen = isTransactionPending || transactionSuccess || !!transactionError;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetTransaction()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Status</DialogTitle>
          <DialogDescription>
            Interacting with the smart contract
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {isTransactionPending && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-medium">Processing Transaction...</p>
              <p className="text-sm text-muted-foreground text-center">Please confirm the transaction in your wallet and wait for it to be mined.</p>
            </>
          )}

          {transactionSuccess && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <p className="text-lg font-medium text-green-600">Transaction Successful</p>
            </>
          )}

          {transactionError && (
            <>
              <XCircle className="h-12 w-12 text-destructive" />
              <p className="text-lg font-medium text-destructive">Transaction Failed</p>
              <p className="text-sm text-muted-foreground text-center text-red-500/80 bg-red-50 p-2 rounded w-full">{transactionError}</p>
            </>
          )}

          {transactionHash && (
            <a 
              href={`${EXPLORER_URL}/tx/${transactionHash}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              View on Explorer
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

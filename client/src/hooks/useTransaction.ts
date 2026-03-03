import { useContractStore } from '../stores/contractStore';
import { parseEthersError } from '../lib/ethers';
import toast from 'react-hot-toast';

export const useTransaction = () => {
  const { 
    setPending, 
    setTransactionHash, 
    setError, 
    setSuccess, 
    resetTransaction,
    isTransactionPending 
  } = useContractStore();

  const executeTransaction = async (
    transactionFunc: () => Promise<any>,
    successMessage: string = 'Transaction successful'
  ) => {
    if (isTransactionPending) return;

    resetTransaction();
    setPending(true);

    try {
      const receipt = await transactionFunc();
      if (receipt && receipt.hash) {
        setTransactionHash(receipt.hash);
      }
      setSuccess(true);
      toast.success(successMessage);
      return receipt;
    } catch (error: any) {
      const errorMessage = parseEthersError(error);
      setError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setPending(false);
    }
  };

  return {
    executeTransaction
  };
};

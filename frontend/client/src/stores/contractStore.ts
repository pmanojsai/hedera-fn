import { create } from 'zustand';

interface ContractState {
  isTransactionPending: boolean;
  transactionHash: string | null;
  transactionError: string | null;
  transactionSuccess: boolean;

  setPending: (isPending: boolean) => void;
  setTransactionHash: (hash: string | null) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean) => void;
  resetTransaction: () => void;
}

export const useContractStore = create<ContractState>((set) => ({
  isTransactionPending: false,
  transactionHash: null,
  transactionError: null,
  transactionSuccess: false,

  setPending: (isPending) => set({ isTransactionPending: isPending }),
  setTransactionHash: (hash) => set({ transactionHash: hash }),
  setError: (error) => set({ transactionError: error }),
  setSuccess: (success) => set({ transactionSuccess: success }),
  resetTransaction: () => set({
    isTransactionPending: false,
    transactionHash: null,
    transactionError: null,
    transactionSuccess: false
  })
}));

import { create } from 'zustand';

export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN' | null;

interface AuthState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  role: UserRole;
  isRoleLoading: boolean;
  
  setAddress: (address: string | null) => void;
  setChainId: (chainId: number | null) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setRole: (role: UserRole) => void;
  setIsRoleLoading: (isLoading: boolean) => void;
  disconnect: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  address: null,
  chainId: null,
  isConnected: false,
  isConnecting: false,
  role: null,
  isRoleLoading: false,

  setAddress: (address) => set({ address, isConnected: !!address }),
  setChainId: (chainId) => set({ chainId }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  setRole: (role) => set({ role }),
  setIsRoleLoading: (isLoading) => set({ isRoleLoading: isLoading }),
  disconnect: () => set({ address: null, chainId: null, isConnected: false, role: null })
}));

import { useCallback, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { getProvider } from '../lib/ethers';
import { EXPECTED_CHAIN_ID, RPC_URL } from '../lib/constants';
import { initializeContracts } from '../services/contract';
import toast from 'react-hot-toast';

export const useWallet = () => {
  const { 
    address, 
    chainId, 
    isConnected, 
    isConnecting, 
    setAddress, 
    setChainId, 
    setIsConnecting, 
    disconnect,
    setRole,
    setIsRoleLoading
  } = useAuthStore();

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('MetaMask is not installed! Please install MetaMask extension.');
      return;
    }

    // Check if MetaMask is unlocked
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        toast.error('Please unlock MetaMask and try again.');
        return;
      }
    } catch (error) {
      toast.error('Failed to check MetaMask status. Please ensure MetaMask is unlocked.');
      return;
    }

    setIsConnecting(true);
    try {
      const provider = getProvider();
      if (!provider) throw new Error('Provider not found');

      const accounts = await provider.send('eth_requestAccounts', []);
      if (accounts.length > 0) {
        setAddress(accounts[0]);
      }

      const network = await provider.getNetwork();
      const currentChainId = Number(network.chainId);
      setChainId(currentChainId);

      if (currentChainId !== EXPECTED_CHAIN_ID) {
        await switchNetwork();
      }

      // Initialize contracts after successful connection
      await initializeContracts();

      toast.success('Wallet connected!');
    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      // Handle specific error cases
      if (error.code === -32603) {
        toast.error('No active wallet found. Please ensure MetaMask is unlocked and try again.');
      } else if (error.code === 4001) {
        toast.error('Connection request was rejected. Please try again.');
      } else {
        toast.error(error?.message || 'Failed to connect wallet');
      }
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const switchNetwork = async () => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${EXPECTED_CHAIN_ID.toString(16)}`,
                chainName: EXPECTED_CHAIN_ID === 1337 ? 'Localhost 8545' : 'Unknown Network',
                rpcUrls: [RPC_URL],
              },
            ],
          });
        } catch (addError) {
          toast.error('Failed to add network to MetaMask.');
        }
      } else {
        toast.error('Please switch to the correct network manually.');
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
          toast.error('Wallet disconnected');
        } else {
          setAddress(accounts[0]);
          // Re-fetch role or reset
          setRole(null);
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        setChainId(parseInt(chainIdHex, 16));
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum?.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [setAddress, disconnect, setChainId, setRole]);

  return {
    address,
    chainId,
    isConnected,
    isConnecting,
    isCorrectNetwork: chainId === EXPECTED_CHAIN_ID,
    connect,
    disconnect
  };
};

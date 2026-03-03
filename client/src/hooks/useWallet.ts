import { useCallback, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { getProvider } from '../lib/ethers';
import { EXPECTED_CHAIN_ID } from '../lib/constants';
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
      toast.error('MetaMask is not installed!');
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

      toast.success('Wallet connected!');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to connect wallet');
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
    } catch (error: any) {
      toast.error('Please switch to the correct network.');
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

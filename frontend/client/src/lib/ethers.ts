import { BrowserProvider, Contract, Eip1193Provider, ethers } from 'ethers';
import { HOSPITAL_ABI, CONTRACT_ADDRESS } from './constants';

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new BrowserProvider(window.ethereum);
  }
  return null;
};

export const getSigner = async () => {
  const provider = getProvider();
  if (provider) {
    return await provider.getSigner();
  }
  return null;
};

export const getContract = (providerOrSigner: BrowserProvider | ethers.Signer) => {
  return new Contract(CONTRACT_ADDRESS, HOSPITAL_ABI, providerOrSigner);
};

export const parseEthersError = (error: any): string => {
  if (error.code === 'ACTION_REJECTED') {
    return 'Transaction was rejected by user.';
  }
  if (error.reason) {
    return error.reason;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unknown error occurred.';
};

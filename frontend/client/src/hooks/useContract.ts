import { useMemo } from 'react';
import { getContracts } from '../services/contract';

export const useContract = () => {
  return useMemo(() => {
    try {
      return getContracts();
    } catch (error) {
      console.error('Contracts not initialized:', error);
      return null;
    }
  }, []);
};

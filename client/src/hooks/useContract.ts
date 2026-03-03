import { useMemo } from 'react';
import { contractInteractions } from '../services/contract-interactions';

export const useContract = () => {
  return useMemo(() => contractInteractions, []);
};

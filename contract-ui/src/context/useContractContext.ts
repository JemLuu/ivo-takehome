/**
 * Hook for accessing contract context
 */

import { useContext } from 'react';
import { ContractContext } from './contractContext';

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within ContractProvider');
  }
  return context;
};

/**
 * Context for managing contract-wide state like clause numbering and mention values
 */

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface ContractContextType {
  clauseCounter: React.MutableRefObject<number>;
  mentionValues: Map<string, string>;
  updateMentionValue: (id: string, value: string) => void;
  getNextClauseNumber: () => number;
  resetClauseCounter: () => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const useContractContext = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContractContext must be used within ContractProvider');
  }
  return context;
};

interface ContractProviderProps {
  children: ReactNode;
}

export const ContractProvider: React.FC<ContractProviderProps> = ({ children }) => {
  const clauseCounter = useRef(0);
  const [mentionValues, setMentionValues] = useState<Map<string, string>>(new Map());

  const updateMentionValue = (id: string, value: string) => {
    setMentionValues((prev) => {
      const updated = new Map(prev);
      updated.set(id, value);
      return updated;
    });
  };

  const getNextClauseNumber = () => {
    clauseCounter.current += 1;
    return clauseCounter.current;
  };

  const resetClauseCounter = () => {
    clauseCounter.current = 0;
  };

  return (
    <ContractContext.Provider
      value={{
        clauseCounter,
        mentionValues,
        updateMentionValue,
        getNextClauseNumber,
        resetClauseCounter,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
/**
 * Context for managing contract-wide state like clause numbering and mention values
 */

import React, { useState, useRef, type ReactNode } from 'react';
import { ContractContext } from './contractContext';

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
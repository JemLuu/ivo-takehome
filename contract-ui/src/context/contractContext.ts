/**
 * React context for contract state
 */

import { createContext } from 'react';

export interface ContractContextType {
  clauseCounter: React.MutableRefObject<number>;
  mentionValues: Map<string, string>;
  updateMentionValue: (id: string, value: string) => void;
  getNextClauseNumber: () => number;
  resetClauseCounter: () => void;
}

export const ContractContext = createContext<ContractContextType | undefined>(undefined);

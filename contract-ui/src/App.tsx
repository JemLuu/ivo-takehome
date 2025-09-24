/**
 * Main application component
 * Renders the contract UI with dynamic contract selection
 */

import React, { useState, useEffect } from 'react';
import { ContractProvider } from './context/ContractContext';
import { ContractRenderer } from './components/ContractRenderer';
import { ContractSelector } from './components/ContractSelector';
import type { ContractData } from './types/ContractTypes';
import './App.css';

const App: React.FC = () => {
  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [currentContract, setCurrentContract] = useState<string>('input.json');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadContract = async (contractFile: string) => {
    try {
      setLoading(true);
      setError(null);

      // Dynamic import of the contract file
      const data = await import(`./inputs/${contractFile}`);
      setContractData(data.default);
      setCurrentContract(contractFile);
    } catch (err) {
      console.error(`Failed to load contract: ${contractFile}`, err);
      setError(`Failed to load contract: ${contractFile}`);
    } finally {
      setLoading(false);
    }
  };

  // Load the default contract on component mount
  useEffect(() => {
    loadContract('input.json');
  }, []);

  const appStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    padding: '20px',
    paddingTop: '80px', // Add space for the fixed selector
  };

  if (loading) {
    return (
      <div style={{
        ...appStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading contract...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        ...appStyle,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#e74c3c'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={appStyle}>
      <ContractSelector
        onContractSelect={loadContract}
        currentContract={currentContract}
      />

      <ContractProvider>
        {contractData && <ContractRenderer data={contractData} />}
      </ContractProvider>
    </div>
  );
};

export default App;

/**
 * Main component for rendering the complete contract document
 */

import React, { useEffect } from 'react';
import type { ContractData } from '../types/ContractTypes';
import { NodeRenderer } from './NodeRenderer';
import { useContractContext } from '../context/useContractContext';

interface ContractRendererProps {
  data: ContractData;
}

export const ContractRenderer: React.FC<ContractRendererProps> = ({ data }) => {
  const { resetClauseCounter } = useContractContext();

  useEffect(() => {
    // Reset clause counter when component mounts or data changes
    resetClauseCounter();
  }, [data, resetClauseCounter]);

  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div style={containerStyle}>
        <p>No contract data available</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {data.map((document, docIndex) => (
        <div key={docIndex}>
          {document.children && Array.isArray(document.children) &&
            document.children.map((node, nodeIndex) => (
              <NodeRenderer key={nodeIndex} node={node} />
            ))}
        </div>
      ))}
    </div>
  );
};
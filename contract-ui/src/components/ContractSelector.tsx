import React, { useState } from 'react';
import { contractTheme } from '../styles/contractTheme';

interface ContractOption {
  id: string;
  name: string;
  file: string;
}

interface ContractSelectorProps {
  onContractSelect: (contractFile: string) => void;
  currentContract?: string;
}

const contractOptions: ContractOption[] = [
  { id: 'input', name: 'input.json', file: 'input.json' },
  { id: 'input2', name: 'input2.json', file: 'input2.json' },
  { id: 'input3', name: 'input3.json', file: 'input3.json' },
  { id: 'input4', name: 'input4.json', file: 'input4.json' },
  { id: 'input5', name: 'input5.json', file: 'input5.json' },
  { id: 'input6', name: 'input6.json', file: 'input6.json' },
  { id: 'input7', name: 'input7.json', file: 'input7.json' },
  { id: 'input8', name: 'input8.json', file: 'input8.json' },
  { id: 'input9', name: 'input9.json', file: 'input9.json' },
  { id: 'input10', name: 'input10.json', file: 'input10.json' },
  { id: 'input11', name: 'input11.json', file: 'input11.json' },
  { id: 'input12', name: 'input12.json', file: 'input12.json' },
  { id: 'input13', name: 'input13.json', file: 'input13.json' },
  { id: 'input14', name: 'input14.json', file: 'input14.json' },
  { id: 'input15', name: 'input15.json', file: 'input15.json' }
];

export const ContractSelector: React.FC<ContractSelectorProps> = ({
  onContractSelect,
  currentContract = 'input.json'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentContractName = () => {
    const current = contractOptions.find(option => option.file === currentContract);
    return current ? current.name : 'Select Contract';
  };

  const handleOptionClick = (option: ContractOption) => {
    onContractSelect(option.file);
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      fontFamily: 'inherit'
    }}>
      <div style={{
        position: 'relative',
        minWidth: contractTheme.selector.minWidth
      }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '100%',
            padding: contractTheme.selector.padding,
            backgroundColor: contractTheme.colors.background,
            border: contractTheme.selector.border,
            borderRadius: contractTheme.selector.borderRadius,
            fontSize: contractTheme.selector.fontSize,
            fontWeight: '500',
            color: contractTheme.colors.primary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: contractTheme.selector.boxShadow,
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = contractTheme.selector.hoverBorder;
            e.currentTarget.style.boxShadow = contractTheme.selector.hoverBoxShadow;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = contractTheme.colors.border;
            e.currentTarget.style.boxShadow = contractTheme.selector.boxShadow;
          }}
        >
          <span>{getCurrentContractName()}</span>
          <span style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            marginLeft: '8px'
          }}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: contractTheme.colors.background,
            border: contractTheme.selector.border,
            borderRadius: contractTheme.selector.borderRadius,
            marginTop: contractTheme.spacing.xs,
            boxShadow: contractTheme.selector.hoverBoxShadow,
            overflow: 'hidden',
            zIndex: 1001
          }}>
            {contractOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                style={{
                  width: '100%',
                  padding: contractTheme.selector.padding,
                  backgroundColor: option.file === currentContract ? contractTheme.colors.lightBackground : contractTheme.colors.background,
                  border: 'none',
                  textAlign: 'left',
                  fontSize: contractTheme.selector.fontSize,
                  color: contractTheme.colors.primary,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  borderBottom: `1px solid ${contractTheme.colors.border}`,
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if (option.file !== currentContract) {
                    e.currentTarget.style.backgroundColor = contractTheme.colors.lightBackground;
                  }
                }}
                onMouseLeave={(e) => {
                  if (option.file !== currentContract) {
                    e.currentTarget.style.backgroundColor = contractTheme.colors.background;
                  }
                }}
              >
                {option.name}
                {option.file === currentContract && (
                  <span style={{
                    float: 'right',
                    color: contractTheme.colors.hoverBorder,
                    fontWeight: '600'
                  }}>
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Backdrop to close dropdown when clicking outside */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
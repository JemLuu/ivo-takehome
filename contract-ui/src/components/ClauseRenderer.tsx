/**
 * Component for rendering clause elements with automatic numbering
 */

import React, { useEffect, useState } from 'react';
import type { BlockNode } from '../types/ContractTypes';
import { useContractContext } from '../context/ContractContext';
import { NodeRenderer } from './NodeRenderer';

interface ClauseRendererProps {
  node: BlockNode;
  inheritedMarks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
  parentType?: string;
  isNested?: boolean;
  subItemIndex?: number;
}

export const ClauseRenderer: React.FC<ClauseRendererProps> = ({ node, inheritedMarks = {}, parentType, isNested = false, subItemIndex }) => {
  const { getNextClauseNumber } = useContractContext();
  const [clauseNumber, setClauseNumber] = useState<number>(0);

  useEffect(() => {
    // Only get a clause number if this is a top-level clause
    if (!isNested) {
      setClauseNumber(getNextClauseNumber());
    }
  }, [isNested]);

  // Merge inherited marks with node marks
  const marks = {
    bold: node.bold || inheritedMarks.bold,
    italic: node.italic || inheritedMarks.italic,
    underline: node.underline || inheritedMarks.underline,
  };

  const clauseStyle: React.CSSProperties = {
    marginBottom: '16px',
    marginTop: '16px',
    display: 'block',
  };

  const clauseContentStyle: React.CSSProperties = {
    display: 'inline',
  };

  const numberStyle: React.CSSProperties = {
    display: 'inline-block',
    marginRight: '8px',
    fontWeight: 'normal',
    minWidth: '20px',
  };

  // Check if this is a sub-clause in definitions section
  const isDefinitionSubClause = parentType === 'clause' && node.title?.includes('definition');

  // Track sub-items for nested clauses
  let subItemCounter = 0;

  // Check if first child is a heading to determine clause layout
  const firstChild = node.children && node.children.length > 0 ? node.children[0] : null;
  const isHeadingClause = firstChild && 'type' in firstChild &&
    (firstChild.type === 'h4' || firstChild.type === 'h3' || firstChild.type === 'h2');

  // For nested definition clauses, render as sub-items with letters
  if (isNested && isDefinitionSubClause && subItemIndex !== undefined) {
    const letter = String.fromCharCode(97 + subItemIndex); // a, b, c, etc.
    return (
      <div style={{ marginLeft: '45px', marginBottom: '4px', marginTop: '4px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ marginRight: '12px', minWidth: '30px' }}>({letter})</span>
          <div style={{ flex: 1 }}>
            {node.children && node.children.map((child, index) => (
              <NodeRenderer key={index} node={child} inheritedMarks={marks} parentType="clause" isNested={true} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isHeadingClause) {
    // For clauses that start with headings, render with simple flex layout
    return (
      <div style={clauseStyle}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {!isNested && clauseNumber > 0 && (
            <span style={numberStyle}>{clauseNumber}.</span>
          )}
          <div style={{ flex: 1 }}>
            {node.children && node.children.map((child, index) => {
              // Track sub-items for definition clauses
              if (child && 'type' in child && child.type === 'clause') {
                const idx = subItemCounter;
                subItemCounter++;
                return (
                  <NodeRenderer
                    key={index}
                    node={child}
                    inheritedMarks={marks}
                    parentType="clause"
                    isNested={true}
                    subItemIndex={idx}
                  />
                );
              }
              return (
                <NodeRenderer
                  key={index}
                  node={child}
                  inheritedMarks={marks}
                  parentType="clause"
                  isNested={isNested}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // For inline clause content
  return (
    <div style={clauseStyle}>
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {!isNested && clauseNumber > 0 && (
          <span style={numberStyle}>{clauseNumber}.</span>
        )}
        <div style={{ flex: 1, ...clauseContentStyle }}>
          {node.children && node.children.map((child, index) => {
            // Track sub-items for definition clauses
            if (child && 'type' in child && child.type === 'clause') {
              const idx = subItemCounter;
              subItemCounter++;
              return (
                <NodeRenderer
                  key={index}
                  node={child}
                  inheritedMarks={marks}
                  parentType="clause"
                  isNested={true}
                  subItemIndex={idx}
                />
              );
            }
            return (
              <NodeRenderer
                key={index}
                node={child}
                inheritedMarks={marks}
                parentType="clause"
                isNested={isNested}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
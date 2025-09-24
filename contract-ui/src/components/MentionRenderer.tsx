/**
 * Component for rendering mention elements with colored background
 */

import React from 'react';
import type { MentionNode } from '../types/ContractTypes';
import { useContractContext } from '../context/useContractContext';
import { NodeRenderer } from './NodeRenderer';
import { contractTheme } from '../styles/contractTheme';

interface MentionRendererProps {
  node: MentionNode;
  inheritedMarks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

export const MentionRenderer: React.FC<MentionRendererProps> = ({ node, inheritedMarks = {} }) => {
  const { mentionValues } = useContractContext();

  // Get the current value from context or use the default
  const currentValue = mentionValues.get(node.id) || node.value;

  // Merge inherited marks with node marks
  const marks = {
    bold: node.bold || inheritedMarks.bold,
    italic: node.italic || inheritedMarks.italic,
    underline: node.underline || inheritedMarks.underline,
  };

  const mentionStyle: React.CSSProperties = {
    backgroundColor: node.color || 'rgb(20, 170, 245)',
    color: 'white',
    padding: contractTheme.mention.padding,
    borderRadius: contractTheme.mention.borderRadius,
    display: contractTheme.mention.display,
    fontWeight: marks.bold ? 'bold' : 'normal',
    fontStyle: marks.italic ? 'italic' : 'normal',
    textDecoration: marks.underline ? 'underline' : 'none',
  };

  return (
    <span style={mentionStyle} title={node.title}>
      {node.children && node.children.length > 0 ? (
        node.children.map((child, index) => (
          <NodeRenderer key={index} node={child} inheritedMarks={marks} />
        ))
      ) : (
        currentValue
      )}
    </span>
  );
};
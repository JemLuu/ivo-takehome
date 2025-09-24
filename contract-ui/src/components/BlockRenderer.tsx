/**
 * Component for rendering block-level elements (headings, paragraphs, lists, etc.)
 */

import React from 'react';
import type { BlockNode, TextNode } from '../types/ContractTypes';
import { NodeRenderer } from './NodeRenderer';
import { TextRenderer } from './TextRenderer';
import { contractTheme, getTypography } from '../styles/contractTheme';

interface BlockRendererProps {
  node: BlockNode;
  inheritedMarks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
  parentType?: string;
  isNested?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ node, inheritedMarks = {}, isNested = false }) => {
  // Merge inherited marks with node marks
  const marks = {
    bold: node.bold || inheritedMarks.bold,
    italic: node.italic || inheritedMarks.italic,
    underline: node.underline || inheritedMarks.underline,
  };

  const renderChildren = () => {
    if (!node.children || !Array.isArray(node.children)) {
      return null;
    }
    return node.children.map((child, index) => {
      // Handle nested 'p' type elements that should be inline text
      if (child && typeof child === 'object' && 'type' in child && child.type === 'p' && node.type === 'p') {
        // If it's a nested p with just text, render the text directly
        if ('text' in child) {
          return <TextRenderer key={index} node={child as TextNode} inheritedMarks={marks} />;
        }
      }

      return (
        <NodeRenderer
          key={index}
          node={child}
          inheritedMarks={marks}
          parentType={node.type}
          isNested={isNested}
        />
      );
    });
  };

  const elementStyle: React.CSSProperties = {
    fontWeight: marks.bold ? 'bold' : 'normal',
    fontStyle: marks.italic ? 'italic' : 'normal',
    textDecoration: marks.underline ? 'underline' : 'none',
  };

  switch (node.type) {
    case 'h1':
      return <h1 style={{ ...elementStyle, ...getTypography('h1') }}>{renderChildren()}</h1>;

    case 'h2':
      return <h2 style={{ ...elementStyle, ...getTypography('h2') }}>{renderChildren()}</h2>;

    case 'h3':
      return <h3 style={{ ...elementStyle, ...getTypography('h3') }}>{renderChildren()}</h3>;

    case 'h4':
      return <h4 style={{ ...elementStyle, ...getTypography('h4') }}>{renderChildren()}</h4>;

    case 'h5':
      return <h5 style={{ ...elementStyle, ...getTypography('h5') }}>{renderChildren()}</h5>;

    case 'h6':
      return <h6 style={{ ...elementStyle, ...getTypography('h6') }}>{renderChildren()}</h6>;

    case 'p': {
      // Check if this p element contains block-level children (which would be invalid HTML)
      const hasBlockChildren = node.children && Array.isArray(node.children) && node.children.some(child =>
        child && typeof child === 'object' && 'type' in child &&
        ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'clause', 'block'].includes(child.type)
      );

      // If it has block children, render as div instead of p to avoid invalid nesting
      if (hasBlockChildren) {
        return <div style={{ ...elementStyle, ...contractTheme.typography.longParagraph }}>{renderChildren()}</div>;
      }
      return <p style={{ ...elementStyle, ...contractTheme.typography.paragraph, whiteSpace: 'pre-line' }}>{renderChildren()}</p>;
    }

    case 'ul':
      return <ul style={{ ...elementStyle, ...contractTheme.lists.ul }}>{renderChildren()}</ul>;

    case 'ol':
      return <ol style={{ ...elementStyle, ...contractTheme.lists.ol }}>{renderChildren()}</ol>;

    case 'li':
      return <li style={{ ...elementStyle, ...contractTheme.lists.li }}>{renderChildren()}</li>;

    case 'lic':
      // 'lic' seems to be list item content - render as span
      return <span style={elementStyle}>{renderChildren()}</span>;

    case 'block':
      return <div style={{ ...elementStyle, marginBottom: contractTheme.spacing.lg }}>{renderChildren()}</div>;

    default:
      return <div style={elementStyle}>{renderChildren()}</div>;
  }
};
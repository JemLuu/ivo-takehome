/**
 * Component for rendering text with appropriate marks (bold, italic, underline)
 */

import React from 'react';
import type { TextNode } from '../types/ContractTypes';

interface TextRendererProps {
  node: TextNode;
  inheritedMarks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}

export const TextRenderer: React.FC<TextRendererProps> = ({ node, inheritedMarks = {} }) => {
  const bold = node.bold || inheritedMarks.bold;
  const italic = node.italic || inheritedMarks.italic;
  const underline = node.underline || inheritedMarks.underline;

  // Convert newlines to line breaks
  const processedText = node.text.split('\n').map((line, index, array) => (
    <React.Fragment key={index}>
      {line}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));

  let element = <>{processedText}</>;

  if (bold) {
    element = <strong>{element}</strong>;
  }

  if (italic) {
    element = <em>{element}</em>;
  }

  if (underline) {
    element = <u>{element}</u>;
  }

  return element;
};
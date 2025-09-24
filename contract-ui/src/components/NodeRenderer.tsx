/**
 * Main component for rendering contract nodes
 * Determines which renderer to use based on node type
 */

import React from 'react';
import type { ContractNode } from '../types/ContractTypes';
import {
  isTextNode,
  isMentionNode,
  isClauseNode,
  isBlockNode
} from '../types/ContractTypes';
import { TextRenderer } from './TextRenderer';
import { MentionRenderer } from './MentionRenderer';
import { ClauseRenderer } from './ClauseRenderer';
import { BlockRenderer } from './BlockRenderer';

interface NodeRendererProps {
  node: ContractNode;
  inheritedMarks?: {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
  parentType?: string;
  isNested?: boolean;
  subItemIndex?: number;
}

export const NodeRenderer: React.FC<NodeRendererProps> = ({ node, inheritedMarks = {}, parentType, isNested = false, subItemIndex }) => {
  if (isTextNode(node)) {
    return <TextRenderer node={node} inheritedMarks={inheritedMarks} />;
  }

  if (isMentionNode(node)) {
    return <MentionRenderer node={node} inheritedMarks={inheritedMarks} />;
  }

  if (isClauseNode(node)) {
    return <ClauseRenderer
      node={node}
      inheritedMarks={inheritedMarks}
      parentType={parentType}
      isNested={isNested || parentType === 'clause'}
      subItemIndex={subItemIndex}
    />;
  }

  if (isBlockNode(node)) {
    return <BlockRenderer
      node={node}
      inheritedMarks={inheritedMarks}
      parentType={parentType}
      isNested={isNested}
    />;
  }

  // Fallback for unknown node types
  console.warn('Unknown node type:', node);
  return null;
};
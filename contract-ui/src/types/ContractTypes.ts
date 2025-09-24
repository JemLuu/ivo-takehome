/**
 * Type definitions for the contract document structure
 * Based on HTML document structure and custom contract elements
 */

export interface TextNode {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export interface MentionNode {
  type: 'mention';
  id: string;
  title: string;
  value: string;
  color?: string;
  variableType?: string;
  children: ContractNode[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface BlockNode {
  type: 'block' | 'clause' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'ul' | 'ol' | 'li' | 'lic';
  title?: string;
  children: ContractNode[];
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
}

export type ContractNode = TextNode | MentionNode | BlockNode;

export interface ContractDocument {
  title: string;
  type: 'block';
  children: ContractNode[];
}

export type ContractData = ContractDocument[];

// Helper type guards
export const isTextNode = (node: ContractNode): node is TextNode => {
  return 'text' in node && !('type' in node);
};

export const isMentionNode = (node: ContractNode): node is MentionNode => {
  return 'type' in node && node.type === 'mention';
};

export const isBlockNode = (node: ContractNode): node is BlockNode => {
  return 'type' in node && node.type !== 'mention';
};

export const isClauseNode = (node: ContractNode): node is BlockNode => {
  return isBlockNode(node) && node.type === 'clause';
};
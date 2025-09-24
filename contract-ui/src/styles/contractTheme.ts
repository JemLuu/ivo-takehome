/**
 * Centralized theme and design tokens for contract UI
 * Single source of truth for all spacing, typography, and colors
 */

export const contractTheme = {
  // Consistent spacing scale (4px base unit)
  spacing: {
    xs: '4px',    // 4px - minimal spacing
    sm: '8px',    // 8px - small spacing
    md: '12px',   // 12px - medium spacing
    lg: '16px',   // 16px - large spacing
    xl: '24px',   // 24px - extra large spacing
    xxl: '32px',  // 32px - extra extra large spacing
    xxxl: '40px', // 40px - maximum spacing
  },

  // Typography system
  typography: {
    // Heading styles
    h1: {
      fontSize: '36px',
      fontWeight: '700',
      color: '#2c3e50',
      marginBottom: '24px',
      marginTop: '0px',
    },
    h2: {
      fontSize: '28px',
      color: '#2c3e50',
      marginBottom: '16px',
      marginTop: '16px',
    },
    h3: {
      fontSize: '24px',
      color: '#2c3e50',
      marginBottom: '14px',
      marginTop: '14px',
    },
    h4: {
      fontSize: '18px',
      color: '#2c3e50',
      marginBottom: '8px',
      marginTop: '0px',
      display: 'inline-block',
    },
    h5: {
      fontSize: '16px',
      color: '#2c3e50',
      marginBottom: '10px',
      marginTop: '10px',
    },
    h6: {
      fontSize: '14px',
      color: '#2c3e50',
      marginBottom: '8px',
      marginTop: '8px',
    },
    // Body text
    paragraph: {
      marginBottom: '8px',
      lineHeight: '1.6',
    },
    // Long form content
    longParagraph: {
      marginBottom: '12px',
      lineHeight: '1.6',
    },
  },

  // List styles
  lists: {
    ul: {
      marginBottom: '8px',
      marginTop: '4px',
      paddingLeft: '40px',
      listStyleType: 'disc',
    },
    ol: {
      marginBottom: '16px',
      paddingLeft: '40px',
    },
    li: {
      marginBottom: '4px',
      lineHeight: '1.6',
    },
  },

  // Clause-specific spacing
  clause: {
    // Main clause container
    marginBottom: '16px',
    marginTop: '16px',

    // Clause numbering
    numberSpacing: '8px',
    numberMinWidth: '20px',

    // Sub-clause (definitions a, b, c)
    subClause: {
      indent: '20px',           // How far (a), (b) are indented
      marginBottom: '4px',
      marginTop: '4px',
      labelSpacing: '0px',      // Space between (a) and text
      labelMinWidth: '30px',    // Width reserved for (a) label
    },
  },

  // Mention (variable) styles
  mention: {
    padding: '2px 6px',
    borderRadius: '4px',
    display: 'inline',
    // Colors are dynamic based on JSON data
  },

  // App layout
  layout: {
    appPadding: '20px',
    appPaddingTop: '80px',     // Space for fixed selector
    containerMaxWidth: '800px',
    containerPadding: '40px',
  },

  // Selector dropdown
  selector: {
    minWidth: '250px',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    border: '2px solid #e1e5e9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    hoverBorder: '#3498db',
    hoverBoxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  },

  // Colors
  colors: {
    primary: '#2c3e50',
    background: '#ffffff',
    lightBackground: '#f5f5f5',
    border: '#e1e5e9',
    hoverBorder: '#3498db',
    text: '#333',
    lightText: '#666',
    error: '#e74c3c',
  },
};

// Type for theme to enable autocomplete
export type ContractTheme = typeof contractTheme;

// Helper function to get spacing values
export const getSpacing = (size: keyof typeof contractTheme.spacing): string => {
  return contractTheme.spacing[size];
};

// Helper function to get typography styles
export const getTypography = (element: keyof typeof contractTheme.typography): React.CSSProperties => {
  return contractTheme.typography[element] as React.CSSProperties;
};